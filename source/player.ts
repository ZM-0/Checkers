import { Board } from "./board.js";
import { Cell } from "./cell.js";
import { Colour } from "./colour.js";
import { Token } from "./token.js";

/**
 * A player. The player manages their tokens and knows when they've lost.
 */
export class Player {
    /**
     * The initial number of tokens a player has.
     */
    private static readonly TOKEN_COUNT: number = 12;

    /**
     * The number of rows of tokens the player starts with.
     */
    private static readonly rowCount: number = Player.TOKEN_COUNT / (Board.SIZE / 2);

    /**
     * The player's token colour.
     */
    private readonly colour: Colour;

    /**
     * The coordinate of the top-left token for this player.
     */
    private readonly startCoordinate: [number, number];

    /**
     * The player's tokens.
     */
    private readonly tokens: Token[] = [];

    /**
     * The board being played on.
     */
    private readonly board: Board;

    /**
     * Creates a new player.
     * @param colour The player's colour.
     * @param board The board being playe don.
     */
    public constructor(colour: Colour, board: Board) {
        this.colour = colour;
        this.startCoordinate = colour === Colour.BLACK ? [5, 0] : [0, 1];
        this.board = board;
        this.createTokens();
    }
    
    /**
     * Creates the player's tokens.
     */
    private createTokens() {
        for (let diagonal: number = 0; diagonal < Board.SIZE / 2; diagonal++) {
            for (let offset: number = 0; offset < Player.rowCount; offset++) {
                const row: number = this.startCoordinate[0] + offset;
                const column: number = (this.startCoordinate[1] + diagonal * (Player.rowCount - 1) + offset) % Board.SIZE;

                const token: Token = new Token(this.colour, row, column);
                this.tokens.push(token);
                this.board.get(row, column).token = token;
            }
        }
    }

    /**
     * Checks if the player has lost.
     * @returns A boolean indicating if the player has lost.
     */
    public hasLost(): boolean {
        return this.countAliveTokens() === 0;
    }

    /**
     * Counts the number of alive tokens.
     * @returns The number of alive tokens.
     */
    private countAliveTokens(): number {
        return this.tokens.filter((token: Token): boolean => token.isAlive).length;
    }

    /**
     * Resets the player's tokens.
     */
    public reset() {
        for (const token of this.tokens) {
            const oldCell: Cell = this.board.get(...token.position);
            oldCell.token = null;
            oldCell.element.replaceChildren();
            token.reset();
        }
        
        for (const token of this.tokens) {
            const newCell: Cell = this.board.get(...token.position);
            newCell.token = token;
            newCell.element.append(token.element);
        }
    }
}
