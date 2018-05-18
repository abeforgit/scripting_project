#! /usr/bin/python3

import cgi
import sys
import os

import cgitb
from typing import Dict, Callable
import json

sys.path.insert(0, '../src')
from engine.games import drop_game, game

GAMELIB: Dict[str, Callable] = {
    "drop": drop_game.DropGame
}

cgitb.enable(logdir='.')

highscore_path = os.path.dirname(os.path.realpath(__file__))


# TODO: send out responses as JSON


def new_game(game_name, params):
    init = GAMELIB[game_name].get_initial_state(params)
    return init


def move(game_name, statedict: Dict, move_dict: Dict) -> Dict:
    mygame: game.Game = GAMELIB[game_name](statedict)
    if move_dict["move"] == mygame.get_grid()[0][0]:
        return {"grid": mygame.get_grid()}

    rslt = mygame.do_move(move_dict)

    if mygame.has_won():
        rslt["msg"] = "WON"

    return rslt


def saveScore(playerName: str, score: int, gamename: str):
    with open(highscore_path + "/highscores.json", "r+") as f:
        data = json.load(f)

        newscore = {player_name: score}

        data[gamename].append(newscore)
        if gamename == "dropgame":

            data[gamename].sort(key=lambda score: next(iter(score.values())))
        else:
            data[gamename].sort(key=lambda score: next(iter(score.values())), reverse=True)

        if len(data[gamename]) > 10:
            data[gamename].pop()

        f.seek(0)
        f.truncate()

        json.dump(data, f)


opts = json.loads(cgi.FieldStorage().getvalue("data"))

request_type: str = opts["type"]
game_name: str = opts.get("game", "drop")

state: Dict = opts.get("state", None)
move_dict: Dict = opts.get("move_data", None)
params: Dict = opts.get("params", None)

player_name: str = opts.get("playername", None)
score: int = opts.get("score", None)

if request_type == "NEW_GAME":
    rslt = new_game(game_name, params)

    print("Content-Type: application/json")
    print()
    print(json.dumps({"grid": rslt, "rows": len(rslt), "cols": len(rslt[0]), "score": 0}))


elif request_type == "MOVE":
    rslt = move(game_name, state, move_dict)

    print("Content-Type: application/json")
    print()
    print(json.dumps({"grid": rslt["grid"], "rows": len(rslt["grid"]), "cols": len(rslt["grid"][0]), "msg": rslt["msg"],
                      "score": rslt["score"]}))

elif request_type == "SCORE":
    saveScore(player_name, int(score), game_name)

elif request_type == "GET_SCORE":

    with open(highscore_path + "/highscores.json", "r") as f:
        print("Content-Type: application/json")
        print()
        print(f.read())

else:
    pass
