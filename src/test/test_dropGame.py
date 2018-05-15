from typing import Dict
from unittest import TestCase
from ..engine.games.DropGame import DropGame


class TestDropGame(TestCase):

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

    def test_do_move_does_move(self):
        dg = DropGame(self.testGrid, ["Green", "Yellow", "Red", "Orange"])
        rslt: Dict = dg.do_move("ORANGE")
        correct = [
            ["ORANGE", "GREEN", "YELLOW"],
            ["YELLOW", "YELLOW", "GREEN"],
            ["RED", "GREEN", "GREEN"]
        ]
        self.assertEqual(correct, rslt["state"])


    def test_drop_1(self):
        dg = DropGame(self.testGrid, ["Green", "Yellow", "Red", "Orange"])
        dg.drop("RED", "GREEN", (0, 0))
        correct = [
            ["GREEN", "GREEN", "YELLOW"],
            ["YELLOW", "YELLOW", "GREEN"],
            ["RED", "GREEN", "GREEN"]
        ]
        self.assertEqual(correct, dg.get_grid())

    def test_drop_2(self):
        dg = DropGame(self.testGrid, ["Green", "Yellow", "Red", "Orange"])
        dg.drop(dg.get_droptile(), "GREEN", (0, 0))
        dg.drop(dg.get_droptile(), "YELLOW", (0, 0))

        correct = [
            ["YELLOW", "YELLOW", "YELLOW"],
            ["YELLOW", "YELLOW", "GREEN"],
            ["RED", "GREEN", "GREEN"]
        ]

        self.assertEqual(correct, dg.get_grid())

    def test_drop_3(self):
        dg = DropGame(self.testGrid, ["Green", "Yellow", "Red", "Orange"])
        dg.drop(dg.get_droptile(), "GREEN", (0, 0))
        dg.drop(dg.get_droptile(), "YELLOW", (0, 0))
        dg.drop(dg.get_droptile(), "GREEN", (0, 0))

        correct = [
            ["GREEN", "GREEN", "GREEN"],
            ["GREEN", "GREEN", "GREEN"],
            ["RED", "GREEN", "GREEN"]
        ]

        self.assertEqual(correct, dg.get_grid())

    def test_drop_4(self):
        dg = DropGame(self.testGrid, ["Green", "Yellow", "Red", "Orange"])
        dg.drop(dg.get_droptile(), "GREEN", (0, 0))
        dg.drop(dg.get_droptile(), "YELLOW", (0, 0))
        dg.drop(dg.get_droptile(), "GREEN", (0, 0))
        dg.drop(dg.get_droptile(), "RED", (0, 0))

        correct = [
            ["RED", "RED", "RED"],
            ["RED", "RED", "RED"],
            ["RED", "RED", "RED"]
        ]

        self.assertEqual(correct, dg.get_grid())

    def test_has_won_true(self):
        my_grid = [["RED" for _ in range(3)] for _ in range(3)]
        dg = DropGame(my_grid, ["RED"])

        self.assertTrue(dg.has_won("RED"))

    def test_has_won_false(self):
        my_grid = [["RED" for _ in range(3)] for _ in range(3)]
        dg = DropGame(my_grid, ["RED"])

        self.assertFalse(dg.has_won("BLUE"))
