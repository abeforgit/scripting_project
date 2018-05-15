from typing import List
from ..util.grid import Grid
import random


class DropGame:

    def __init__(self, size: int, colors: List[str]):
        self._grid = Grid(size, size)
        self._colors = colors

    def reset(self):
        r = random.Random()

        for i, row in enumerate(self._grid.get_rows()):
            for j, _ in enumerate(row):
                self._grid.set_cell(i, j, r.choice(self._colors))

    def get_grid(self):
        return self._grid
