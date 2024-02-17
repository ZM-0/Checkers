import { Cell, Direction, Link } from "./cell.js";
/**
 * A board of cells.
 */
export class Board {
    /**
     * The board dimensions in cells.
     */
    static SIZE = 8;
    /**
     * The cells in the board.
     */
    cells = [];
    /**
     * Creates and sets up the cells in the board.
     * @param game The current game.
     */
    constructor(game) {
        this.createCells(game);
        this.createLinks();
        this.chainLinks();
    }
    /**
     * Creates the cells in the board.
     * @param game The current game.
     */
    createCells(game) {
        for (let row = 0; row < Board.SIZE; row++) {
            this.cells.push([]);
            for (let column = 0; column < Board.SIZE; column++) {
                this.cells[row].push(new Cell(row, column, game));
            }
        }
    }
    /**
     * Sets the links between adjacent cells.
     */
    createLinks() {
        for (let row = 0; row < Board.SIZE; row++) {
            for (let column = 0; column < Board.SIZE; column++) {
                const cell = this.cells[row][column];
                if (row > 0 && column > 0) {
                    cell.set(Direction.TOP_LEFT, new Link(this.cells[row - 1][column - 1]));
                }
                if (row > 0 && column < Board.SIZE - 1) {
                    cell.set(Direction.TOP_RIGHT, new Link(this.cells[row - 1][column + 1]));
                }
                if (row < Board.SIZE - 1 && column > 0) {
                    cell.set(Direction.BOTTOM_LEFT, new Link(this.cells[row + 1][column - 1]));
                }
                if (row < Board.SIZE - 1 && column < Board.SIZE - 1) {
                    cell.set(Direction.BOTTOM_RIGHT, new Link(this.cells[row + 1][column + 1]));
                }
            }
        }
    }
    /**
     * Links the links together to form chains.
     */
    chainLinks() {
        for (let row = 0; row < Board.SIZE; row++) {
            for (let column = 0; column < Board.SIZE; column++) {
                const cell = this.cells[row][column];
                let next;
                let secondNext;
                // Chain links in each direction
                Object
                    .keys(Direction)
                    .filter((key) => !isNaN(Number(key)))
                    .map((key) => Number(key))
                    .forEach((key) => {
                    next = cell.get(key);
                    secondNext = next?.cell.get(key);
                    if (secondNext)
                        next.next = secondNext;
                });
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
    /**
     * Removes the focus from all cells.
     */
    unfocusAll() {
        for (const row of this.cells) {
            for (const cell of row) {
                cell.focused = false;
            }
        }
    }
    /**
     * Removes the highlights from all cells.
     */
    unhighlightAll() {
        for (const row of this.cells) {
            for (const cell of row) {
                cell.highlight(false);
            }
        }
    }
}
