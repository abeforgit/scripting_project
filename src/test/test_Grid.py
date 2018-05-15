import unittest
import src.engine.util.grid as grid


class test_grid(unittest.TestCase):

    def test_grid_initialize(self):
        mygrid: grid.Grid = grid.Grid(3, 4)
        self.assertEqual([[None, None, None, None], [None, None, None, None], [None, None, None, None]], mygrid._grid)


    def test_set_cell_sets_cells(self):
        mygrid = grid.Grid(5, 6)
        val = "testval"

        mygrid.set_cell(2, 3, val)

        self.assertEqual(mygrid.get_cell(2, 3), val)
