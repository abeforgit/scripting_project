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


    fetch('../cgi-bin/runner.py?data=' + JSON.stringify(data))
        .then(response => response.json())
        .then(function (s) {
            console.log(s["grid"]);
            let rows = parseInt(s["rows"]);
            let cols;
            if (!s["cols"] === "None") {
                cols = rows
            } else {
                cols = s["cols"]
            }
            STATE = s["grid"].slice();
            gamegrid(rows, cols, s["grid"], "gamegrid");
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


$(get_new_state(data));
