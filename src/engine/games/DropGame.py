from typing import List, Dict, Tuple
from ..util.grid import Grid
import random
import copy

COLORS: List[str] = ["RED", "GREEN", "BLUE", "YELLOW", "ORANGE"]
DIRS: List[Tuple[int, int]] = [(1, 0), (-1, 0), (0, 1), (0, -1)]


class DropGame:

    def __init__(self, state: List[List], colors: List):
        self._grid = copy.deepcopy(state)
        self._colors = colors

    def get_randomized_grid(self) -> List[List]:
        r = random.Random()

        for i, row in enumerate(self._grid):
            for j, _ in enumerate(row):
                self._grid[i][j] = r.choice(self._colors)

        return self._grid

    def get_grid(self) -> List[List]:
        return self._grid

    def get_droptile(self) -> str:
        return self._grid[0][0]

    def do_move(self, move_val: str) -> Dict:
        self.drop(self.get_droptile(), move_val, (0, 0))

        response: Dict = {
            "state": self._grid,
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

    def has_won(self, color) -> bool:
        for row in self._grid:
            for cell in row:
                if cell != color:
                    return False

        return True
