/**
 * A cell or position in the 8x8 gameboard.
 */
export class Cell {
    /**
     * The top-left cell or null if there is none.
     */
    _topLeft = null;
    /**
     * The top-right cell or null if there is none.
     */
    _topRight = null;
    /**
     * The bottom-left cell or null if there is none.
     */
    _bottomLeft = null;
    /**
     * The bottom-right cell or null if there is none.
     */
    _bottomRight = null;
    /**
     * The token on this cell or null if no token is on it.
     */
    _token = null;
    /**
     * Gets the top-left cell.
     */
    get topLeft() {
        return this._topLeft;
    }
    /**
     * Sets the top-left cell for this cell.
     * @throws Error if it is already assigned.
     */
    set topLeft(cell) {
        if (this._topLeft !== null)
            throw new Error("Top-left cell already assigned");
        this._topLeft = cell;
    }
    /**
     * Gets the top-right cell.
     */
    get topRight() {
        return this._topRight;
    }
    /**
     * Sets the top-right cell for this cell.
     * @throws Error if it is already assigned.
     */
    set topRight(cell) {
        if (this._topRight !== null)
            throw new Error("Top-right cell already assigned");
        this._topRight = cell;
    }
    /**
     * Gets the bottom-left cell.
     */
    get bottomLeft() {
        return this._bottomLeft;
    }
    /**
     * Sets the bottom-left cell for this cell.
     * @throws Error if it is already assigned.
     */
    set bottomLeft(cell) {
        if (this._bottomLeft !== null)
            throw new Error("Bottom-left cell already assigned");
        this._bottomLeft = cell;
    }
    /**
     * Gets the bottom-right cell.
     */
    get bottomRight() {
        return this._bottomRight;
    }
    /**
     * Sets the bottom-right cell for this cell.
     * @throws Error if it is already assigned.
     */
    set bottomRight(cell) {
        if (this._bottomRight !== null)
            throw new Error("Bottom-right cell already assigned");
        this._bottomRight = cell;
    }
    /**
     * Gets the token on the cell, or null if there is no token.
     */
    get token() {
        return this._token;
    }
    /**
     * Sets the token on the cell, or sets null to remove any token from the cell.
     * @throws Error if there is already a token on the cell.
     */
    set token(token) {
        if (this._token !== null)
            throw new Error("Can't have two tokens on one cell");
        this._token = token;
    }
    /**
     * Checks if a cell is immediately adjacent to this one.
     * @param cell The cell to check for.
     * @returns A boolean indicating if the given cell is immediately adjacent.
     */
    isAdjacent(cell) {
        return [this.topLeft, this.topRight, this.bottomLeft, this.bottomRight].includes(cell);
    }
}
