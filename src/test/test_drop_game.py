import unittest
from typing import Dict
from ..engine.games.DropGame import DropGame


class test_drop_game(unittest.TestCase):

    def setUp(self):
        self.testGrid = [
            ["RED", "GREEN", "YELLOW"],
            ["YELLOW", "YELLOW", "GREEN"],
            ["RED", "GREEN", "GREEN"]
        ]

    def test_reset_fills_cells(self):
        dg = DropGame(self.testGrid, ["Green", "Yellow", "Red", "Orange"])
        rslt = dg.get_randomized_grid()

        self.assertFalse(rslt == self.testGrid)

    def test_do_move_has_keys(self):
        dg = DropGame(self.testGrid, ["Green", "Yellow", "Red", "Orange"])
        rslt: Dict = dg.do_move("ORANGE")

        self.assertTrue("state" in rslt.keys())
        self.assertTrue("msg" in rslt.keys())

    def test_response_contains_state_grid(self):
        dg = DropGame(self.testGrid, ["Green", "Yellow", "Red", "Orange"])
        rslt: Dict = dg.do_move("ORANGE")

        self.assertIsInstance(rslt["state"], list)



