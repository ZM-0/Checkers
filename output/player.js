import { Board } from "./board.js";
import { MoveValidator } from "./move-validator.js";
import { Token } from "./token.js";
/**
 * A player.
 */
export class Player {
    /**
     * The initial number of tokens a player has.
     */
    TOKEN_COUNT = 12;
    /**
     * The player's colour.
     */
    COLOUR;
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
        this.COLOUR = colour;
        this.createTokens(board);
    }
    /**
     * Creates the player's tokens.
     * @param board The gameboard.
     */
    createTokens(board) {
        for (let i = 0; i < this.TOKEN_COUNT; i++) {
            const cellIndex = (i > 3 && i < 8) ? (41 + i * 2) : (40 + i * 2);
            const cellRow = Math.floor(cellIndex / Board.getSize());
            const cellColumn = cellIndex % Board.getSize();
            const cell = board.getCell(cellRow, cellColumn);
            this.tokens.push(new Token(this.COLOUR, cell));
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
        const moveValidotor = new MoveValidator();
        for (const token of this.tokens) {
            if (token.isAlive && !moveValidotor.isBlocked(token))
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
