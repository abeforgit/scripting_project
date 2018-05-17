from typing import List, Dict, Tuple
from ..util.grid import Grid
import random
import copy
from . import game

COLORS: List[str] = ["RED", "GREEN", "BLUE", "YELLOW", "ORANGE"]
DIRS: List[Tuple[int, int]] = [(1, 0), (-1, 0), (0, 1), (0, -1)]


class DropGame(game.Game):

    @staticmethod
    def get_initial_state(params: Dict) -> List[List]:

        rows: int = params["rows"]
        cols: int = params.get("cols", None)
        colors: List[str] = params["colors"]

        if not cols:
            cols = rows

        r = random.Random()
        return [[ r.choice(colors) for _ in range(cols)] for _ in range(rows)]

    def __init__(self, state: Dict):
        super().__init__()
        self._grid = copy.deepcopy(state["grid"])

    def get_grid(self) -> List[List]:
        return self._grid

    def get_droptile(self) -> str:
        return self._grid[0][0]

    def do_move(self, move_dict: Dict) -> Dict:
        move_val = move_dict["move"]
        self.drop(self.get_droptile(), move_val, (0, 0))

        response: Dict = {
            "grid": self._grid,
            "msg": None
        }

        return response

    def drop(self, color: str, new_color: str, cur_pos: Tuple[int, int]) -> None:

        self._grid[cur_pos[0]][cur_pos[1]] = new_color

        for direction in DIRS:
            next_pos = (cur_pos[0] + direction[0], cur_pos[1] + direction[1])
            if 0 <= next_pos[0] < len(self._grid) and 0 <= next_pos[1] < len(self._grid[0]):
                if self._grid[next_pos[0]][next_pos[1]] == color:
                    self.drop(color, new_color, next_pos)

    def has_won(self) -> bool:
        color = self.get_droptile()
        for row in self._grid:
            for cell in row:
                if cell != color:
                    return False

        return True
