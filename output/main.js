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
    static SIZE = 8;
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
     * Gets the board dimensions.
     * @returns The board dimensions in cells.
     */
    static getSize() {
        return this.SIZE;
    }
    /**
     * Creates the cells in the board.
     */
    createCells() {
        for (let row = 0; row < Board.SIZE; row++) {
            this.cells.push([]);
            for (let column = 0; column < Board.SIZE; column++) {
                this.cells[row].push(new Cell());
            }
        }
    }
    /**
     * Assigns the diagonally adjacent cells to each cell.
     */
    assignAdjacentCells() {
        for (let row = 0; row < Board.SIZE; row++) {
            for (let column = 0; column < Board.SIZE; column++) {
                const cell = this.cells[row][column];
                if (row > 0 && column > 0)
                    cell.topLeft = this.cells[row - 1][column - 1];
                if (row > 0 && column < Board.SIZE - 1)
                    cell.topRight = this.cells[row - 1][column + 1];
                if (row < Board.SIZE - 1 && column > 0)
                    cell.bottomLeft = this.cells[row + 1][column - 1];
                if (row < Board.SIZE - 1 && column < Board.SIZE - 1)
                    cell.bottomRight = this.cells[row + 1][column + 1];
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
        if (row < 0 || row >= Board.SIZE || column < 0 || column >= Board.SIZE) {
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
     * Sets the top-left cell for this cell. Does nothing if it is already assigned.
     */
    set topLeft(cell) {
        if (this._topLeft !== null)
            return;
        this._topLeft = cell;
    }
    /**
     * Gets the top-right cell.
     */
    get topRight() {
        return this._topRight;
    }
    /**
     * Sets the top-right cell for this cell. Does nothing if it is already assigned.
     */
    set topRight(cell) {
        if (this._topRight !== null)
            return;
        this._topRight = cell;
    }
    /**
     * Gets the bottom-left cell.
     */
    get bottomLeft() {
        return this._bottomLeft;
    }
    /**
     * Sets the bottom-left cell for this cell. Does nothing if it is already assigned.
     */
    set bottomLeft(cell) {
        if (this._bottomLeft !== null)
            return;
        this._bottomLeft = cell;
    }
    /**
     * Gets the bottom-right cell.
     */
    get bottomRight() {
        return this._bottomRight;
    }
    /**
     * Sets the bottom-right cell for this cell. Does nothing if it is already assigned.
     */
    set bottomRight(cell) {
        if (this._bottomRight !== null)
            return;
        this._bottomRight = cell;
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
    /**
     * Checks if a cell is immediately adjacent to this one.
     * @param cell The cell to check for.
     * @returns A boolean indicating if the given cell is immediately adjacent.
     */
    isAdjacent(cell) {
        return cell === this.topLeft || cell === this.topRight || cell === this.bottomLeft || cell === this.bottomRight;
    }
}
// ====================================================================================================
// 
// Player
// 
// ====================================================================================================
/**
 * A player.
 */
class Player {
    /**
     * The initial number of tokens a player has.
     */
    TOKEN_COUNT = 12;
    /**
     * The player's colour.
     */
    COLOUR;
    /**
     * The player's tokens.
     */
    tokens = [];
    /**
     * Creates a new player.
     * @param colour The player's colour.
     * @param board The gameboard.
     */
    constructor(colour, board) {
        this.COLOUR = colour;
        this.createTokens(board);
    }
    /**
     * Creates the player's tokens.
     * @param board The gameboard.
     */
    createTokens(board) {
        for (let i = 0; i < this.TOKEN_COUNT; i++) {
            const cellIndex = (i > 3 && i < 8) ? (41 + i * 2) : (40 + i * 2);
            const cellRow = Math.floor(cellIndex / Board.getSize());
            const cellColumn = cellIndex % Board.getSize();
            const cell = board.getCell(cellRow, cellColumn);
            this.tokens.push(new Token(this.COLOUR, cell));
        }
    }
    /**
     * Checks if the player has lost by checking if all tokens are dead or blocked.
     * @returns A boolean indicating if the player has lost.
     */
    hasLost() {
        let aliveCount = 0;
        for (const token of this.tokens)
            if (token.isAlive)
                aliveCount++;
        return aliveCount === 0 || this.isBlocked();
    }
    /**
     * Checks if all the player's tokens are blocked.
     * @returns A boolean indicating if all the alive tokens can't move.
     */
    isBlocked() {
        const moveValidotor = new MoveValidator();
        for (const token of this.tokens) {
            if (token.isAlive && !moveValidotor.isBlocked(token))
                return false;
        }
        return true;
    }
    /**
     * Resets the player and all its tokens.
     */
    reset() {
        for (const token of this.tokens) {
            token.reset();
        }
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
// Move Validator
// 
// ====================================================================================================
/**
 * Gets valid token moves and validates moves.
 */
class MoveValidator {
    /**
     * Checks if a token is blocked and can't make any moves.
     * @param token The token to check for.
     * @returns A boolean indicating if the token is blocked or not.
     */
    isBlocked(token) {
        if (!token.cell)
            throw new Error("Can't check if token is blocked unless it's on a cell");
        return this.getValidMoves(token.cell).length === 0;
    }
    /**
     * Checks if a given move is valid.
     * @param start The token's cell at the start of the move.
     * @param end The token's cell at the end of the move.
     * @returns A boolean indicating if the move is valid.
     */
    isValidMove(start, end) {
        return this.getValidMoves(start).includes(end);
    }
    /**
     * Gets the valid moves for a token at a given cell.
     * @param start The token's cell at the start of the move.
     * @returns A list of the valid cells to move to.
     * @throws Error if the start cell doesn't have a token.
     */
    getValidMoves(start) {
        if (!start.hasToken())
            throw new Error("Need token on cell to find moves");
        const moves = [];
        const colour = start.token.getColour();
        // Check upward cells for moves
        if (colour === Colour.BLACK || start.token.isKing)
            moves.push(...this.getValidUpMoves(start));
        // Check downward cells for moves
        if (colour == Colour.WHITE || start.token.isKing)
            moves.push(...this.getValidDownMoves(start));
        return moves;
    }
    /**
     * Gets the valid moves of a token in the upwards direction.
     * @param start The token's current cell.
     */
    getValidUpMoves(start) {
        const moves = [];
        const topLeftMove = this.getValidMove(start, start.topLeft, start.topLeft?.topLeft);
        if (topLeftMove)
            moves.push(topLeftMove);
        const topRightMove = this.getValidMove(start, start.topRight, start.topRight?.topRight);
        if (topRightMove)
            moves.push(topRightMove);
        return moves;
    }
    /**
     * Gets the valid moves of a token in the downwards direction.
     * @param start The token's current cell.
     */
    getValidDownMoves(start) {
        const moves = [];
        const bottomLeftMove = this.getValidMove(start, start.bottomLeft, start.bottomLeft?.bottomLeft);
        if (bottomLeftMove)
            moves.push(bottomLeftMove);
        const bottomRightMove = this.getValidMove(start, start.bottomRight, start.bottomRight?.bottomRight);
        if (bottomRightMove)
            moves.push(bottomRightMove);
        return moves;
    }
    /**
     * Finds the valid cell to move to, if any, in a given direction.
     * The cells in the chosen direction must be explicitly provided.
     * @param start The token's current cell.
     * @param next1 The next adjacent cell.
     * @param next2 The second-next adjacent cell.
     * @returns The valid cell to move to, or null if there is no valid move in the chosen direction.
     */
    getValidMove(start, next1, next2) {
        if (next1 && !next1.hasToken())
            return next1;
        if (next1 && next1.token.getColour() !== start.token.getColour() && next2 && !next2.hasToken())
            return next2;
        return null;
    }
}
// ====================================================================================================
// 
// Move
// 
// ====================================================================================================
/**
 * Responsible for executing a token move.
 */
class Move {
    /**
     * The start cell of the move.
     */
    start;
    /**
     * The end cell of the move.
     */
    end;
    /**
     * Creates a new move with a start cell.
     * @param start The token's cell at the move start.
     */
    constructor(start) {
        this.start = start;
    }
    /**
     * Sets the end cell of the move.
     * @param end The token's cell at the move end.
     */
    setEnd(end) {
        this.end = end;
    }
    /**
     * Executes the move.
     * @throws Error if the move isn't valid.
     */
    execute() {
        const validator = new MoveValidator();
        if (!validator.isValidMove(this.start, this.end))
            throw new Error("Cannot execute invalid move");
        const token = this.start.token;
        this.start.removeToken();
        token.cell = this.end;
        this.end.token = token;
        const isKill = !this.start.isAdjacent(this.end);
        if (isKill) {
            const middle = this.getMiddle();
            middle.token.isAlive = false;
            middle.removeToken();
        }
    }
    /**
     * Gets the cell jumped over, if any.
     * @returns The cell jumped over in the move, or null if no cell was jumped over.
     */
    getMiddle() {
        if (this.start.topLeft?.topLeft === this.end)
            return this.start.topLeft;
        if (this.start.topRight?.topRight === this.end)
            return this.start.topRight;
        if (this.start.bottomLeft?.bottomLeft === this.end)
            return this.start.bottomLeft;
        if (this.start.bottomRight?.bottomRight === this.end)
            return this.start.bottomRight;
        return null;
    }
}
// ====================================================================================================
// 
// Main script
// 
// ====================================================================================================
// Colour the board cells
let colour = Colour.WHITE;
for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
        const cell = document.querySelector(`#cell-${row * 8 + column}`);
        cell.style.backgroundColor = colour === Colour.BLACK ? "#000" : "#FFF";
        colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
    }
    colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
}
