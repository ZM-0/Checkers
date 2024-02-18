import { Board } from "./board.js";
import { Colour } from "./colour.js";
import { Game } from "./game.js";
// Colour the board cells
let colour = Colour.WHITE;
for (let row = 0; row < Board.SIZE; row++) {
    for (let column = 0; column < Board.SIZE; column++) {
        const cell = document.querySelector(`#cell-${row * 8 + column}`);
        cell.style.backgroundColor = colour === Colour.BLACK ? "#8C969D" : "#F8F9FA";
        colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
    }
    colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
}
// Create a new game
const game = new Game();
// Handle game resetting
document.querySelector("header button").addEventListener("click", () => {
    game.reset();
});
