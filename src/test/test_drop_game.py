import unittest
from ..engine.games.DropGame import DropGame


class test_drop_game(unittest.TestCase):

    def test_reset_fills_cells(self):
        dg = DropGame(5, ["Green", "Yellow", "Red", "Orange"])
        nulls = [[None for _ in range(5)] for _ in range(5)]
        dg.reset()

        self.assertNotEqual(dg.get_grid(), nulls)
