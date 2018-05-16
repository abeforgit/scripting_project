#! /usr/bin/python3

import cgi
import cgitb
from src.engine.games import drop_game, game
from typing import Dict, Callable

GAMELIB: Dict[str, Callable[game.Game]] = {
    "drop": drop_game.DropGame
}

cgitb.enable()

# TODO: parse incoming JSON instead of expecting dicts
# TODO: send out responses as JSON


def new_game(game_name, params):
    init = GAMELIB[game_name].get_initial_state(params)
    return init


def move(game_name, statedict: Dict) -> Dict:
    mygame: game.Game = GAMELIB[game_name](statedict)
    return mygame.do_move(statedict)


opts = cgi.FieldStorage()
request_type: str = opts.getvalue("type")
game_name: str = opts.getvalue("game", "drop")
state: Dict = opts.getvalue("state", None)
params: Dict = opts.getvalue("params", None)

if request_type == "NEW_GAME":
    new_game(game_name, params)
elif request_type == "MOVE":
    move(game_name, state)
else:
    pass
