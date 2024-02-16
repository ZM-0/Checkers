import { Cell } from "./cell.js";
import { Colour } from "./main.js";

/**
 * A player's token.
 */
export class Token {
    /**
     * Indicates if the token is alive.
     */
    public isAlive: boolean = true;

    /**
     * Indicates if the token is a king.
     */
    public isKing: boolean = false;

    /**
     * The token's colour.
     */
    private COLOUR: Colour;

    /**
     * The token's initial cell.
     */
    private defaultCell: Cell;

    /**
     * The cell the token is on, or null if dead.
     */
    public cell: Cell | null;

    /**
     * Creates a new token.
     * @param colour The token's colour.
     * @param cell The cell the token is on.
     */
    constructor(colour: Colour, cell: Cell) {
        this.COLOUR = colour;
        this.defaultCell = cell;
        this.cell = cell;
    }

    /**
     * Gets the token's colour.
     * @returns The token's colour.
     */
    public getColour(): Colour {
        return this.COLOUR;
    }

    /**
     * Resets the token to its initial position and state.
     */
    public reset() {
        this.isAlive = true;
        this.isKing = false;
        this.cell?.removeToken();
        this.cell = this.defaultCell;
        this.cell.token = this;
    }
}
