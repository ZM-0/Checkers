import { Token } from "./token.js";

/**
 * A cell or position in the 8x8 gameboard.
 */
export class Cell {
    /**
     * The top-left cell or null if there is none.
     */
    private _topLeft: Cell | null = null;

    /**
     * The top-right cell or null if there is none.
     */
    private _topRight: Cell | null = null;

    /**
     * The bottom-left cell or null if there is none.
     */
    private _bottomLeft: Cell | null = null;

    /**
     * The bottom-right cell or null if there is none.
     */
    private _bottomRight: Cell | null = null;

    /**
     * The token on this cell or null if no token is on it.
     */
    private _token: Token | null = null;

    /**
     * Gets the top-left cell.
     */
    public get topLeft(): Cell | null {
        return this._topLeft;
    }

    /**
     * Sets the top-left cell for this cell. Does nothing if it is already assigned.
     */
    public set topLeft(cell: Cell) {
        if (this._topLeft !== null) return;
        this._topLeft = cell;
    }

    /**
     * Gets the top-right cell.
     */
    public get topRight(): Cell | null {
        return this._topRight;
    }

    /**
     * Sets the top-right cell for this cell. Does nothing if it is already assigned.
     */
    public set topRight(cell: Cell) {
        if (this._topRight !== null) return;
        this._topRight = cell;
    }

    /**
     * Gets the bottom-left cell.
     */
    public get bottomLeft(): Cell | null {
        return this._bottomLeft;
    }

    /**
     * Sets the bottom-left cell for this cell. Does nothing if it is already assigned.
     */
    public set bottomLeft(cell: Cell) {
        if (this._bottomLeft !== null) return;
        this._bottomLeft = cell;
    }

    /**
     * Gets the bottom-right cell.
     */
    public get bottomRight(): Cell | null {
        return this._bottomRight;
    }

    /**
     * Sets the bottom-right cell for this cell. Does nothing if it is already assigned.
     */
    public set bottomRight(cell: Cell) {
        if (this._bottomRight !== null) return;
        this._bottomRight = cell;
    }

    /**
     * Gets the token on the cell, or null if there is no token.
     */
    public get token(): Token | null {
        return this._token;
    }

    /**
     * Sets the token on the cell. Does nothing if there is already a token on it.
     */
    public set token(token: Token) {
        if (this._token !== null) return;
        this._token = token;
    }

    /**
     * Checks if the cell has a token.
     * @returns A boolean indicating if the cell has a token.
     */
    public hasToken(): boolean {
        return this._token !== null;
    }

    /**
     * Removes the token from the cell, if any.
     */
    public removeToken() {
        this._token = null;
    }

    /**
     * Checks if a cell is immediately adjacent to this one.
     * @param cell The cell to check for.
     * @returns A boolean indicating if the given cell is immediately adjacent.
     */
    public isAdjacent(cell: Cell): boolean {
        return cell === this.topLeft || cell === this.topRight || cell === this.bottomLeft || cell === this.bottomRight;
    }
}
