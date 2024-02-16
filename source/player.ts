import { Board } from "./board.js";
import { Cell } from "./cell.js";
import { Colour } from "./main.js";
import { MoveValidator } from "./move-validator.js";
import { Token } from "./token.js";

/**
 * A player.
 */
export class Player {
    /**
     * The initial number of tokens a player has.
     */
    private TOKEN_COUNT: number = 12;

    /**
     * The player's colour.
     */
    private COLOUR: Colour;

    /**
     * The player's tokens.
     */
    private tokens: Token[] = [];

    /**
     * Creates a new player.
     * @param colour The player's colour.
     * @param board The gameboard.
     */
    constructor(colour: Colour, board: Board) {
        this.COLOUR = colour;
        this.createTokens(board);
    }

    /**
     * Creates the player's tokens.
     * @param board The gameboard.
     */
    private createTokens(board: Board) {
        for (let i: number = 0; i < this.TOKEN_COUNT; i++) {
            const cellIndex: number = (i > 3 && i < 8) ? (41 + i * 2) : (40 + i * 2);
            const cellRow: number = Math.floor(cellIndex / Board.getSize());
            const cellColumn: number = cellIndex % Board.getSize();
            const cell: Cell = board.getCell(cellRow, cellColumn);

            this.tokens.push(new Token(this.COLOUR, cell));
        }
    }

    /**
     * Checks if the player has lost by checking if all tokens are dead or blocked.
     * @returns A boolean indicating if the player has lost.
     */
    public hasLost(): boolean {
        let aliveCount: number = 0;
        for (const token of this.tokens) if (token.isAlive) aliveCount++;
        return aliveCount === 0 || this.isBlocked();
    }

    /**
     * Checks if all the player's tokens are blocked.
     * @returns A boolean indicating if all the alive tokens can't move.
     */
    private isBlocked(): boolean {
        const moveValidotor: MoveValidator = new MoveValidator();

        for (const token of this.tokens) {
            if (token.isAlive && !moveValidotor.isBlocked(token)) return false;
        }

        return true;
    }

    /**
     * Resets the player and all its tokens.
     */
    public reset() {
        for (const token of this.tokens) {
            token.reset();
        }
    }
}
