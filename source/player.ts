import { Board } from "./board.js";
import { Cell } from "./cell.js";
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
    private static readonly TOKEN_COUNT: number = 12;

    /**
     * The player's colour.
     */
    private readonly colour: Colour;

    /**
     * The player's tokens.
     */
    private readonly tokens: Token[] = [];

    /**
     * Creates a new player.
     * @param colour The player's colour.
     * @param board The gameboard.
     */
    public constructor(colour: Colour, board: Board) {
        this.colour = colour;
        this.createTokens(board);
    }

    /**
     * Creates the player's tokens.
     * @param board The gameboard.
     */
    private createTokens(board: Board) {
        const startRow: number = this.colour === Colour.WHITE ? 0 : 5;
        const startColumn: number = this.colour === Colour.WHITE ? 1 : 0;

        for (let diagonal: number = 0; diagonal < 4; diagonal++) {
            for (let offset: number = 0; offset < 3; offset++) {
                const row: number = startRow + offset;
                const column: number = (startColumn + diagonal * 2 + offset) % Board.SIZE;
                const cell: Cell = board.getCell(row, column);
                this.tokens.push(new Token(this.colour, cell));
            }
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
        const moveValidator: MoveValidator = new MoveValidator();

        for (const token of this.tokens) {
            if (token.isAlive && !moveValidator.isBlocked(token)) return false;
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
