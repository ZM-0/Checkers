// ====================================================================================================
// 
// Player and cell colour
// 
// ====================================================================================================


/**
 * Identifies the colour of the cells and players.
 */
enum Colour {
    BLACK,
    WHITE
}


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
    private SIZE: number = 8;

    /**
     * The cells in the board.
     */
    private cells: Cell[][] = [];

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
    private createCells() {
        for (let row: number = 0; row < this.SIZE; row++) {
            this.cells.push([]);

            for (let column: number = 0; column < this.SIZE; column++) {
                this.cells[row].push(new Cell());
            }
        }
    }

    /**
     * Assigns the diagonally adjacent cells to each cell.
     */
    private assignAdjacentCells() {
        for (let row: number = 0; row < this.SIZE; row++) {
            for (let column: number = 0; column < this.SIZE; column++) {
                const cell: Cell = this.cells[row][column];
                
                if (row > 0 && column > 0) cell.topLeft = this.cells[row - 1][column - 1];
                if (row > 0 && column < this.SIZE - 1) cell.topRight = this.cells[row - 1][column + 1];
                if (row < this.SIZE - 1 && column > 0) cell.bottomLeft = this.cells[row + 1][column - 1];
                if (row < this.SIZE - 1 && column < this.SIZE - 1) cell.bottomRight = this.cells[row + 1][column + 1];
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
    public getCell(row: number, column: number): Cell {
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
     * The player's colour.
     */
    private COLOUR: Colour;

    /**
     * The player's tokens.
     */
    private tokens!: Token[];

    /**
     * Creates a new player.
     * @param colour The player's colour.
     */
    constructor(colour: Colour) {
        this.COLOUR = colour;
        this.createTokens();
    }

    /**
     * Creates the player's tokens and links them to the DOM.
     */
    private createTokens() {

    }

    /**
     * Checks if the player has lost.
     * @returns A boolean indicating if the player has lost.
     */
    public hasLost(): boolean {
        return false;
    }

    /**
     * Checks if all the player's tokens are blocked.
     * @returns A boolean indicating if all the alive tokens can't move.
     */
    private isBlocked(): boolean {
        return false;
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
    private cell: Cell | null;

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
     * Gets the token's cell.
     * @returns The token's cell or null if there isn't one.
     */
    public getCell(): Cell | null {
        return this.cell;
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
     * Gets the valid moves for a token at a given cell.
     * @param start The token's cell at the start of the move.
     * @returns A list of the valid cells to move to.
     * @throws Error if the start cell doesn't have a token.
     */
    public getValidMoves(start: Cell): Cell[] {
        if (!start.hasToken()) throw new Error("Need token on cell to find moves");
        const moves: Cell[] = [];
        const colour: Colour = start.token!.getColour();

        // Check upward cells for moves
        if (colour === Colour.BLACK || start.token!.isKing) moves.push(...this.getValidUpMoves(start));

        // Check downward cells for moves
        if (colour == Colour.WHITE || start.token!.isKing) moves.push(...this.getValidDownMoves(start));

        return moves;
    }

    /**
     * Gets the valid moves of a token in the upwards direction.
     * @param start The token's current cell.
     */
    private getValidUpMoves(start: Cell): Cell[] {
        const moves: Cell[] = [];

        const topLeftMove: Cell | null = this.getValidMove(start, start.topLeft, start.topLeft?.topLeft);
        if (topLeftMove) moves.push(topLeftMove);

        const topRightMove: Cell | null = this.getValidMove(start, start.topRight, start.topRight?.topRight);
        if (topRightMove) moves.push(topRightMove);

        return moves;
    }

    /**
     * Gets the valid moves of a token in the downwards direction.
     * @param start The token's current cell.
     */
    private getValidDownMoves(start: Cell): Cell[] {
        const moves: Cell[] = [];

        const bottomLeftMove: Cell | null = this.getValidMove(start, start.bottomLeft, start.bottomLeft?.bottomLeft);
        if (bottomLeftMove) moves.push(bottomLeftMove);

        const bottomRightMove: Cell | null = this.getValidMove(start, start.bottomRight, start.bottomRight?.bottomRight);
        if (bottomRightMove) moves.push(bottomRightMove);

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
    private getValidMove(start: Cell, next1: Cell | null | undefined, next2: Cell | null | undefined): Cell | null {
        if (next1 && !next1.hasToken()) return next1;
        if (next1 && next1.token!.getColour() !== start.token!.getColour() && next2 && !next2.hasToken()) return next2;
        return null;
    }
}


// ====================================================================================================
// 
// Main script
// 
// ====================================================================================================


// Colour the board cells

let colour: Colour = Colour.BLACK;

for (let row: number = 0; row < 8; row++) {
    for (let column: number = 0; column < 8; column++) {
        const cell: HTMLDivElement = document.querySelector(`#cell-${row * 8 + column}`)!;
        cell.style.backgroundColor = colour === Colour.BLACK ? "#000" : "#FFF";
        colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
    }

    colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
}
