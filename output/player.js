import { Board } from "./board.js";
import { Colour } from "./colour.js";
import { Token } from "./token.js";
/**
 * A player. The player manages their tokens and knows when they've lost.
 */
export class Player {
    /**
     * The initial number of tokens a player has.
     */
    static TOKEN_COUNT = 12;
    /**
     * The number of rows of tokens the player starts with.
     */
    static rowCount = Player.TOKEN_COUNT / (Board.SIZE / 2);
    /**
     * The player's token colour.
     */
    colour;
    /**
     * The coordinate of the top-left token for this player.
     */
    startCoordinate;
    /**
     * The player's tokens.
     */
    tokens = [];
    /**
     * The board being played on.
     */
    board;
    /**
     * Creates a new player.
     * @param colour The player's colour.
     * @param board The board being playe don.
     */
    constructor(colour, board) {
        this.colour = colour;
        this.startCoordinate = colour === Colour.BLACK ? [5, 0] : [0, 1];
        this.board = board;
        this.createTokens();
    }
    /**
     * Creates the player's tokens.
     */
    createTokens() {
        for (let diagonal = 0; diagonal < Board.SIZE / 2; diagonal++) {
            for (let offset = 0; offset < Player.rowCount; offset++) {
                const row = this.startCoordinate[0] + offset;
                const column = (this.startCoordinate[1] + diagonal * (Player.rowCount - 1) + offset) % Board.SIZE;
                const token = new Token(this.colour, row, column);
                this.tokens.push(token);
                this.board.get(row, column).token = token;
            }
        }
    }
    /**
     * Checks if the player has lost.
     * @returns A boolean indicating if the player has lost.
     */
    hasLost() {
        return this.countAliveTokens() === 0;
    }
    /**
     * Counts the number of alive tokens.
     * @returns The number of alive tokens.
     */
    countAliveTokens() {
        return this.tokens.filter((token) => token.isAlive).length;
    }
    /**
     * Resets the player's tokens.
     */
    reset() {
        for (const token of this.tokens) {
            const oldCell = this.board.get(...token.position);
            oldCell.token = null;
            oldCell.element.replaceChildren();
            token.reset();
        }
        for (const token of this.tokens) {
            const newCell = this.board.get(...token.position);
            newCell.token = token;
            newCell.element.append(token.element);
        }
    }
}
