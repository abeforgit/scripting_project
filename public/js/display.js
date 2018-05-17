const gamegrid = (rows, cols, grid, targetElementId) => {

    let rowtemplate = '';
    let coltemplate = '';
    let rowind = 1;

    for (let i = 0; i < cols; i+=1) {
        coltemplate += 'auto ';
    }

    for (let row of grid) {
        rowtemplate += 'auto ';
        let colind = 1;
        for (let cell of row) {
            $("#" + targetElementId).append(
                `<div id = "${rowind}_${colind}" class="game-cell" style="grid-row: ${rowind}; grid-column: ${colind}; background-color: ${cell}"/>`
            );
            colind += 1;
        }
        rowind += 1;
    }

    $('#' + targetElementId).css('grid-template-rows', rowtemplate).css('grid-template-columns', coltemplate);

    $('.game-cell').click((event) => do_move(event.target.style.gridRow.match(/[0-9]*/)[0], event.target.style.gridColumn.match(/[0-9]*/)[0]));

};