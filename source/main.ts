import { Board } from "./board.js";
import { Colour } from "./colour.js";
import { Game } from "./game.js";

// Colour the board cells

let colour: Colour = Colour.WHITE;

for (let row: number = 0; row < Board.SIZE; row++) {
    for (let column: number = 0; column < Board.SIZE; column++) {
        const cell: HTMLDivElement = document.querySelector(`#cell-${row * 8 + column}`)!;
        cell.style.backgroundColor = colour === Colour.BLACK ? "#8C969D" : "#F8F9FA";
        colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
    }

    colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
}

// Create a new game
const game: Game = new Game();

// Handle game resetting
document.querySelector("header button")!.addEventListener("click", () => {
    game.reset();
});
