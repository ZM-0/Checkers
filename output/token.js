import { Board } from "./board.js";
import { Colour } from "./colour.js";
/**
 * A player's token.
 */
export class Token {
    /**
     * The token's colour.
     */
    colour;
    /**
     * Indicates if the token is alive.
     */
    isAlive = true;
    /**
     * Indicates if the token is a king.
     */
    isKing = false;
    /**
     * The token's initial coordinate.
     */
    defaultPosition;
    /**
     * The token's current coordinate.
     */
    position;
    /**
     * The token's DOM element.
     */
    element;
    /**
     * Creates a new token.
     * @param colour The token's colour.
     * @param row The token's initial row.
     * @param column The token's initial column.
     */
    constructor(colour, row, column) {
        this.colour = colour;
        this.defaultPosition = [row, column];
        this.position = [row, column];
        this.element = document.querySelector(`#cell-${row * Board.SIZE + column} > i`);
    }
    /**
     * Checks if the token is at the opposite edge of the board.
     * @returns A boolean indicating if the token has reached the other end.
     */
    atOtherEnd() {
        return this.colour === Colour.BLACK && this.position[0] === 0 || this.colour === Colour.WHITE && this.position[0] === Board.SIZE - 1;
    }
}
