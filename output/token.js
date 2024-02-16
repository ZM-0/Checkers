/**
 * A player's token. This class is mainly responsible for exposing information about a token.
 */
export class Token {
    /**
     * The token's colour.
     */
    colour;
    /**
     * Indicates if the token is alive.
     */
    _isAlive = true;
    /**
     * Indicates if the token is a king.
     */
    isKing = false;
    /**
     * The token's initial cell.
     */
    defaultCell;
    /**
     * The cell the token is on, or null if dead.
     */
    _cell;
    /**
     * Creates a new token with a given colour and links it to an initial cell.
     * @param colour The token's colour.
     * @param cell The initial cell the token is on.
     */
    constructor(colour, cell) {
        this.colour = colour;
        this.defaultCell = cell;
        this.cell = cell;
    }
    /**
     * Checks if the token is alive.
     */
    get isAlive() {
        return this._isAlive;
    }
    /**
     * Kills the token.
     */
    kill() {
        this._isAlive = false;
        this._cell = null;
    }
    /**
     * Gets the token's cell.
     * @throws Error if the token is dead and not on a cell.
     */
    get cell() {
        if (!this.isAlive)
            throw new Error("Cannot get cell of dead token");
        return this._cell;
    }
    /**
     * Moves the token to another cell and removes it from any previous cell.
     */
    set cell(cell) {
        if (this._cell)
            this._cell.token = null;
        this._cell = cell;
        this._cell.token = this;
    }
    /**
     * Resets the token to its initial position and state.
     */
    reset() {
        this._isAlive = true;
        this.isKing = false;
        this.cell = this.defaultCell;
    }
}
