let data = {
    type: "NEW_GAME",
    params: {
        rows: 5,
        colors: [
            "red",
            "green",
            "yellow",
            "blue"
        ]
    }
};

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
            gamegrid(rows, cols, STATE, "gamegrid");
            if (rslt["msg"] === "WON") {
                alert("Congratulations!");
            }
        });


};

const do_move = (row, col) => {


    let color = $('#colorselection').find(":selected").text();

    let movedata = {
        type: "MOVE",
        state: {
            grid: STATE
        },
        move_data: {
            move: color,
            row: parseInt(row),
            col: parseInt(col)
        }
    };


    get_new_state(movedata)

};
