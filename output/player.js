import { Board } from "./board.js";
import { Colour } from "./main.js";
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
        // The cell index where the tokens start for this player
        const firstIndex = this.colour === Colour.WHITE ? 1 : 40;
        // The index offset for the middle row of tokens
        const middleOffset = this.colour === Colour.WHITE ? -1 : 1;
        /**
         * Checks if a token number is in the player's middle row of tokens.
         * @param index The token number.
         * @returns A boolean indicating if the token is in the player's middle row.
         */
        const inMiddle = function (index) {
            return index >= Board.SIZE / 2 && index < Player.TOKEN_COUNT - Board.SIZE / 2;
        };
        // Create the tokens and assign their cells
        for (let i = 0; i < Player.TOKEN_COUNT; i += 2) {
            // Locate the token's cell
            const cellIndex = inMiddle(i) ? (firstIndex + middleOffset + i * 2) : (firstIndex + i * 2);
            const cellRow = Math.floor(cellIndex / Board.SIZE);
            const cellColumn = cellIndex % Board.SIZE;
            const cell = board.getCell(cellRow, cellColumn);
            this.tokens.push(new Token(this.colour, cell));
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
