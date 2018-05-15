from typing import List


class Grid:

    def __init__(self, rows: int, cols: int, fillval=None):
        self._grid: List[List] = [[fillval for _ in range(cols)] for _ in range(rows)]

    def get_rows(self):
        return self._grid

    def set_cell(self, row: int, col: int, val):
        self._grid[row][col] = val

    def get_cell(self, row: int, col: int):
        return self._grid[row][col]
