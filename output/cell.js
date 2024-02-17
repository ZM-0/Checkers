import { Board } from "./board.js";
import { MoveValidator } from "./move-validator.js";
import { Move } from "./move.js";
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
     * The DOM element for the cell.
     */
    element;
    /**
     * Creates a new cell and links it to the DOM.
     * @param row The cell's row index.
     * @param column The cell's column index.
     * @param game The current game.
     */
    constructor(row, column, game) {
        this.element = document.querySelector(`#cell-${row * Board.SIZE + column}`);
        // Event listener for starting a move
        this.element.addEventListener("click", () => {
            if (!this.token || this.token.colour !== game.turn)
                return;
            game.nextMove = new Move(this, game);
            // Highlight the valid destination cells
            game.board.unfocusAll();
            const moves = (new MoveValidator()).getValidMoves(this);
            moves.forEach((cell) => cell.focus(true));
        });
    }
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
        if (this._topLeft)
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
        if (this._topRight)
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
        if (this._bottomLeft)
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
        if (this._bottomRight)
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
        if (this._token)
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
    /**
     * Sets the sell as focused or unfocused.
     * @param focus A boolean indicating whether to focus or unfocus the cell.
     */
    focus(focus) {
        if (focus)
            this.element.classList.add("focus");
        else
            this.element.classList.remove("focus");
    }
}
