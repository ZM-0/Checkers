"use strict";
// ====================================================================================================
// 
// Player and cell colour
// 
// ====================================================================================================
/**
 * Identifies the colour of the cells and players.
 */
var Colour;
(function (Colour) {
    Colour[Colour["BLACK"] = 0] = "BLACK";
    Colour[Colour["WHITE"] = 1] = "WHITE";
})(Colour || (Colour = {}));
// ====================================================================================================
// 
// Board
// 
// ====================================================================================================
/**
 * An 8x8 grid gameboard of cells.
 */
class Board {
    /**
     * The board dimensions.
     */
    SIZE = 8;
    /**
     * The cells in the board.
     */
    cells = [];
    /**
     * Sets up the cells in the board.
     */
    constructor() {
        this.createCells();
        this.assignAdjacentCells();
    }
    /**
     * Creates the cells in the board.
     */
    createCells() {
        for (let row = 0; row < this.SIZE; row++) {
            this.cells.push([]);
            for (let column = 0; column < this.SIZE; column++) {
                this.cells[row].push(new Cell());
            }
        }
    }
    /**
     * Assigns the diagonally adjacent cells to each cell.
     */
    assignAdjacentCells() {
        for (let row = 0; row < this.SIZE; row++) {
            for (let column = 0; column < this.SIZE; column++) {
                const adjacentCells = [
                    [
                        row > 0 && column > 0 ? this.cells[row - 1][column - 1] : null,
                        row > 0 && column < this.SIZE - 1 ? this.cells[row - 1][column + 1] : null
                    ],
                    [
                        row < this.SIZE - 1 && column > 0 ? this.cells[row + 1][column - 1] : null,
                        row < this.SIZE - 1 && column < this.SIZE - 1 ? this.cells[row + 1][column + 1] : null
                    ]
                ];
                this.cells[row][column].adjacentCells = adjacentCells;
            }
        }
    }
    /**
     * Gets a cell in the board.
     * @param row The row index.
     * @param column The column index.
     * @returns The cell.
     * @throws RangeError if the indexes are out of bounds.
     */
    getCell(row, column) {
        if (row < 0 || row >= this.SIZE || column < 0 || column >= this.SIZE) {
            throw new RangeError("Invalid cell row or column");
        }
        return this.cells[row][column];
    }
}
// ====================================================================================================
// 
// Cell
// 
// ====================================================================================================
/**
 * A cell or position in the 8x8 gameboard.
 */
class Cell {
    /**
     * The diagonally adjacent cells as a 2D array. The first subarray are cells above,
     * the second subarray are the cells below. The first in each subarray is the left cell.
     * If an adjacent cell doesn't exist (i.e. corner or edge) the entry is null.
     */
    _adjacentCells = null;
    /**
     * The token on this cell or null if no token is on it.
     */
    _token = null;
    /**
     * Gets the adjacent cells.
     */
    get adjacentCells() {
        return this._adjacentCells;
    }
    /**
     * Sets the adjacent cells for this cell.
     */
    set adjacentCells(cells) {
        if (this._adjacentCells !== null)
            return;
        this._adjacentCells = cells;
    }
    /**
     * Gets the token on the cell, or null if there is no token.
     */
    get token() {
        return this._token;
    }
    /**
     * Sets the token on the cell. Does nothing if there is already a token on it.
     */
    set token(token) {
        if (this._token !== null)
            return;
        this._token = token;
    }
    /**
     * Checks if the cell has a token.
     * @returns A boolean indicating if the cell has a token.
     */
    hasToken() {
        return this._token !== null;
    }
    /**
     * Removes the token from the cell, if any.
     */
    removeToken() {
        this._token = null;
    }
}
// ====================================================================================================
// 
// Token
// 
// ====================================================================================================
/**
 * A player's token.
 */
class Token {
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
     * Gets the token's cell.
     * @returns The token's cell or null if there isn't one.
     */
    getCell() {
        return this.cell;
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
// ====================================================================================================
// 
// Main script
// 
// ====================================================================================================
// Colour the board cells
let colour = Colour.BLACK;
for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
        const cell = document.querySelector(`#cell-${row * 8 + column}`);
        cell.style.backgroundColor = colour === Colour.BLACK ? "#000" : "#FFF";
        colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
    }
    colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
}
