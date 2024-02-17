import { Cell, Direction } from "./cell.js";
/**
 * A board of cells. Responsible for creating, linking, and retrieving the cells.
 */
export class Board {
    /**
     * The board dimensions in cells.
     */
    static SIZE = 8;
    /**
     * The cells.
     */
    cells = [];
    /**
     * Creates a new board.
     */
    constructor() {
        this.createCells();
        this.linkCells();
    }
    /**
     * Creates the cells.
     */
    createCells() {
        for (let row = 0; row < Board.SIZE; row++) {
            this.cells.push([]);
            for (let column = 0; column < Board.SIZE; column++) {
                this.cells[row].push(new Cell(row, column));
            }
        }
    }
    /**
     * Links the cells to each other.
     */
    linkCells() {
        for (let row = 0; row < Board.SIZE; row++) {
            for (let column = 0; column < Board.SIZE; column++) {
                const cell = this.cells[row][column];
                if (this.inBounds(row - 1, column - 1))
                    cell.setLink(Direction.TOP_LEFT, this.get(row - 1, column - 1));
                if (this.inBounds(row - 1, column + 1))
                    cell.setLink(Direction.TOP_RIGHT, this.get(row - 1, column + 1));
                if (this.inBounds(row + 1, column - 1))
                    cell.setLink(Direction.BOTTOM_LEFT, this.get(row + 1, column - 1));
                if (this.inBounds(row + 1, column + 1))
                    cell.setLink(Direction.BOTTOM_RIGHT, this.get(row + 1, column + 1));
            }
        }
    }
    /**
     * Gets a cell in the board.
     * @param row The row index.
     * @param column The column index.
     * @throws RangeError if the coordinate is out of bounds.
     */
    get(row, column) {
        if (!this.inBounds(row, column))
            throw new RangeError("Cell coordinate out of bounds");
        return this.cells[row][column];
    }
    /**
     * Checks if a cell coordinate is in bounds of the board.
     * @param row The row index.
     * @param column The column index.
     * @returns A boolean indicating if the given coordinate is in bounds.
     */
    inBounds(row, column) {
        return row >= 0 && row < Board.SIZE && column >= 0 && column < Board.SIZE;
    }
}
