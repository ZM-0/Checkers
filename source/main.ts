import { Cell } from "./cell.js";
import { MoveValidator } from "./move-validator.js";
import { Move } from "./move.js";
import { Token } from "./token.js";

/**
 * Identifies the colour of the cells, players, and tokens.
 */
export enum Colour {
    BLACK,
    WHITE
}

// Colour the board cells

let colour: Colour = Colour.WHITE;

for (let row: number = 0; row < 8; row++) {
    for (let column: number = 0; column < 8; column++) {
        const cell: HTMLDivElement = document.querySelector(`#cell-${row * 8 + column}`)!;
        cell.style.backgroundColor = colour === Colour.BLACK ? "#000" : "#FFF";
        colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
    }

    colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
}
