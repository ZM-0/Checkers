"use strict";
// ====================================================================================================
// 
// Player and cell colour
// 
// ====================================================================================================
/**
 * Identifies the colour of the cells and players.
 */
var Colour;
(function (Colour) {
    Colour[Colour["BLACK"] = 0] = "BLACK";
    Colour[Colour["WHITE"] = 1] = "WHITE";
})(Colour || (Colour = {}));
// ====================================================================================================
// 
// Main script
// 
// ====================================================================================================
// Colour the board cells
let colour = Colour.BLACK;
for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
        const cell = document.querySelector(`#cell-${row * 8 + column}`);
        cell.style.backgroundColor = colour === Colour.BLACK ? "#000" : "#FFF";
        colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
    }
    colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
}