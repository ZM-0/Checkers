import { Cell } from "./cell.js";

/**
 * An 8x8 grid gameboard of cells.
 */
export class Board {
    /**
     * The board dimensions.
     */
    private static SIZE: number = 8;

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
     * Gets the board dimensions.
     * @returns The board dimensions in cells.
     */
    public static getSize(): number {
        return this.SIZE;
    }

    /**
     * Creates the cells in the board.
     */
    private createCells() {
        for (let row: number = 0; row < Board.SIZE; row++) {
            this.cells.push([]);

            for (let column: number = 0; column < Board.SIZE; column++) {
                this.cells[row].push(new Cell());
            }
        }
    }

    /**
     * Assigns the diagonally adjacent cells to each cell.
     */
    private assignAdjacentCells() {
        for (let row: number = 0; row < Board.SIZE; row++) {
            for (let column: number = 0; column < Board.SIZE; column++) {
                const cell: Cell = this.cells[row][column];
                
                if (row > 0 && column > 0) cell.topLeft = this.cells[row - 1][column - 1];
                if (row > 0 && column < Board.SIZE - 1) cell.topRight = this.cells[row - 1][column + 1];
                if (row < Board.SIZE - 1 && column > 0) cell.bottomLeft = this.cells[row + 1][column - 1];
                if (row < Board.SIZE - 1 && column < Board.SIZE - 1) cell.bottomRight = this.cells[row + 1][column + 1];
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
        if (row < 0 || row >= Board.SIZE || column < 0 || column >= Board.SIZE) {
            throw new RangeError("Invalid cell row or column");
        }

        return this.cells[row][column];
    }
}
