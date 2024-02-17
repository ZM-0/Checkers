import { Board } from "./board.js";
import { Colour } from "./colour.js";
import { MoveValidator } from "./move-validator.js";
import { Token } from "./token.js";
/**
 * A player. The player knows about its tokens and whether it's lost.
 */
export class Player {
    /**
     * The initial number of tokens a player has.
     */
    static TOKEN_COUNT = 12;
    /**
     * The player's colour.
     */
    colour;
    /**
     * The player's tokens.
     */
    tokens = [];
    /**
     * Creates a new player.
     * @param colour The player's colour.
     * @param board The gameboard.
     */
    constructor(colour, board) {
        this.colour = colour;
        this.createTokens(board);
    }
    /**
     * Creates the player's tokens.
     * @param board The gameboard.
     */
    createTokens(board) {
        const startRow = this.colour === Colour.WHITE ? 0 : 5;
        const startColumn = this.colour === Colour.WHITE ? 1 : 0;
        for (let diagonal = 0; diagonal < 4; diagonal++) {
            for (let offset = 0; offset < 3; offset++) {
                const row = startRow + offset;
                const column = (startColumn + diagonal * 2 + offset) % Board.SIZE;
                const cell = board.getCell(row, column);
                this.tokens.push(new Token(this.colour, cell));
            }
        }
    }
    /**
     * Checks if the player has lost by checking if all tokens are dead or blocked.
     * @returns A boolean indicating if the player has lost.
     */
    hasLost() {
        let aliveCount = 0;
        for (const token of this.tokens)
            if (token.isAlive)
                aliveCount++;
        return aliveCount === 0 || this.isBlocked();
    }
    /**
     * Checks if all the player's tokens are blocked.
     * @returns A boolean indicating if all the alive tokens can't move.
     */
    isBlocked() {
        const moveValidator = new MoveValidator();
        for (const token of this.tokens) {
            if (token.isAlive && !moveValidator.isBlocked(token))
                return false;
        }
        return true;
    }
    /**
     * Resets the player and all its tokens.
     */
    reset() {
        for (const token of this.tokens) {
            token.reset();
        }
    }
}
