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
                const adjacentCells: (Cell | null)[][] = [
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
     * The diagonally adjacent cells as a 2D array. The first subarray are cells above,
     * the second subarray are the cells below. The first in each subarray is the left cell.
     * If an adjacent cell doesn't exist (i.e. corner or edge) the entry is null.
     */
    private _adjacentCells: (Cell | null)[][] | null = null;

    /**
     * The token on this cell or null if no token is on it.
     */
    private _token: Token | null = null;

    /**
     * Gets the adjacent cells.
     */
    public get adjacentCells(): (Cell | null)[][] | null {
        return this._adjacentCells;
    }

    /**
     * Sets the adjacent cells for this cell.
     */
    public set adjacentCells(cells: (Cell | null)[][]) {
        if (this._adjacentCells !== null) return;
        this._adjacentCells = cells;
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
// Token
// 
// ====================================================================================================


class Token {

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
