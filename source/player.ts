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
        // The cell index where the tokens start for this player
        const firstIndex: number = this.colour === Colour.WHITE ? 1 : 40;

        // The index offset for the middle row of tokens
        const middleOffset: number = this.colour === Colour.WHITE ? -1 : 1;

        /**
         * Checks if a token number is in the player's middle row of tokens.
         * @param index The token number.
         * @returns A boolean indicating if the token is in the player's middle row.
         */
        const inMiddle = function(index: number): boolean {
            return index >= Board.SIZE / 2 && index < Player.TOKEN_COUNT - Board.SIZE / 2;
        }

        // Create the tokens and assign their cells
        for (let i: number = 0; i < Player.TOKEN_COUNT; i += 2) {
            // Locate the token's cell
            const cellIndex: number = inMiddle(i) ? (firstIndex + middleOffset + i * 2) : (firstIndex + i * 2);
            const cellRow: number = Math.floor(cellIndex / Board.SIZE);
            const cellColumn: number = cellIndex % Board.SIZE;
            const cell: Cell = board.getCell(cellRow, cellColumn);

            this.tokens.push(new Token(this.colour, cell));
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
