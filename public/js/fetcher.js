

let STATE;

const get_new_state = (data) => {

    let rslt = {};


    fetch('../cgi-bin/runner.py?data=' + JSON.stringify(data))
        .then(response => response.json())
        .then(function (s) {
            rslt = s;
            let rows = parseInt(rslt["rows"]);
            let cols;
            if (!(rslt["cols"] === "None")) {
                cols = rows
            } else {
                cols = rslt["cols"]
            }
            STATE = rslt["grid"].slice();
            let score = rslt["score"];
            gamegrid(rows, cols, STATE, score, "gamegrid");
            if (rslt["msg"] === "WON") {
                let name = prompt("Congratulations!", "Enter your name");
                if (name !== null) {
                    save_score(name, score, "dropgame");
                }


            }
        });


};

const do_move = (row, col, score) => {


    let color = $('#colorselection').find(":selected").text();

    let movedata = {
        type: "MOVE",
        state: {
            grid: STATE
        },
        move_data: {
            move: color,
            row: parseInt(row),
            col: parseInt(col),
            score: score
        }
    };


    get_new_state(movedata)

};

const save_score = (playername, score, gamename) => {
    let scoredata = {
        game: gamename,
        type: "SCORE",
        score: score,
        playername: playername
    };

    fetch('../cgi-bin/runner.py?data=' + JSON.stringify(scoredata)).then(() => {
        alert("Scores saved!")
    })

};

const get_highscores = () => {
    let data = {
        type: "GET_SCORE"
    };
    fetch('../cgi-bin/runner.py?data=' + JSON.stringify(data))
        .then((response => response.json()))
        .then((s) => {
            $('#drop_scores').html('');
            $('#phaser_scores').html('');
            s.dropgame.forEach(
                (item) => {
                    console.log(Object.keys(item));

                    $('#drop_scores').append(`<div class="row"><span class="col-sm">${Object.keys(item)[0]}</span><span class="col-sm">${Object.values(item)[0]}</span></div>`)
                }
            );
            s.phaser.forEach(
                (item) => {
                    $('#phaser_scores').append(`<div class="row"><span class="col-sm">${Object.keys(item)}</span><span class="col-sm">${Object.values(item)[0]}</span></div>`)
                }
            );
        })
}
