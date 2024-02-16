/**
 * A player's token.
 */
export class Token {
    /**
     * Indicates if the token is alive.
     */
    isAlive = true;
    /**
     * Indicates if the token is a king.
     */
    isKing = false;
    /**
     * The token's colour.
     */
    COLOUR;
    /**
     * The token's initial cell.
     */
    defaultCell;
    /**
     * The cell the token is on, or null if dead.
     */
    cell;
    /**
     * Creates a new token.
     * @param colour The token's colour.
     * @param cell The cell the token is on.
     */
    constructor(colour, cell) {
        this.COLOUR = colour;
        this.defaultCell = cell;
        this.cell = cell;
    }
    /**
     * Gets the token's colour.
     * @returns The token's colour.
     */
    getColour() {
        return this.COLOUR;
    }
    /**
     * Resets the token to its initial position and state.
     */
    reset() {
        this.isAlive = true;
        this.isKing = false;
        this.cell?.removeToken();
        this.cell = this.defaultCell;
        this.cell.token = this;
    }
}
