// ====================================================================================================
// 
// Player and cell colour
// 
// ====================================================================================================


/**
 * Identifies the colour of the cells and players.
 */
enum Colour {
    BLACK,
    WHITE
}


// ====================================================================================================
// 
// Main script
// 
// ====================================================================================================


// Colour the board cells

let colour: Colour = Colour.BLACK;

for (let row: number = 0; row < 8; row++) {
    for (let column: number = 0; column < 8; column++) {
        const cell: HTMLDivElement = document.querySelector(`#cell-${row * 8 + column}`)!;
        cell.style.backgroundColor = colour === Colour.BLACK ? "#000" : "#FFF";
        colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
    }

    colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
}
