import { Cell, Direction } from "./cell.js";
import { Game } from "./game.js";

/**
 * A board of cells. Responsible for creating, linking, and retrieving the cells.
 */
export class Board {
    /**
     * The board dimensions in cells.
     */
    public static readonly SIZE: number = 8;

    /**
     * The cells.
     */
    private readonly cells: Cell[][] = [];

    /**
     * Creates a new board.
     * @param game The current game.
     */
    public constructor(game: Game) {
        this.createCells(game);
        this.linkCells();
    }

    /**
     * Creates the cells.
     * @param game The current game.
     */
    private createCells(game: Game) {
        for (let row: number = 0; row < Board.SIZE; row++) {
            this.cells.push([]);

            for (let column: number = 0; column < Board.SIZE; column++) {
                this.cells[row].push(new Cell(row, column, game));
            }
        }
    }

    /**
     * Links the cells to each other.
     */
    private linkCells() {
        for (let row: number = 0; row < Board.SIZE; row++) {
            for (let column: number = 0; column < Board.SIZE; column++) {
                const cell: Cell = this.cells[row][column];

                if (this.inBounds(row - 1, column - 1)) cell.setLink(Direction.TOP_LEFT, this.get(row - 1, column - 1));
                if (this.inBounds(row - 1, column + 1)) cell.setLink(Direction.TOP_RIGHT, this.get(row - 1, column + 1));
                if (this.inBounds(row + 1, column - 1)) cell.setLink(Direction.BOTTOM_LEFT, this.get(row + 1, column - 1));
                if (this.inBounds(row + 1, column + 1)) cell.setLink(Direction.BOTTOM_RIGHT, this.get(row + 1, column + 1));
            }
        }
    }

    /**
     * Gets a cell in the board.
     * @param row The row index.
     * @param column The column index.
     * @throws RangeError if the coordinate is out of bounds.
     */
    public get(row: number, column: number): Cell {
        if (!this.inBounds(row, column)) throw new RangeError("Cell coordinate out of bounds");
        return this.cells[row][column];
    }

    /**
     * Checks if a cell coordinate is in bounds of the board.
     * @param row The row index.
     * @param column The column index.
     * @returns A boolean indicating if the given coordinate is in bounds.
     */
    private inBounds(row: number, column: number): boolean {
        return row >= 0 && row < Board.SIZE && column >= 0 && column < Board.SIZE;
    }

    /**
     * Unfocuses all cells.
     */
    public unfocusAll() {
        for (const row of this.cells) {
            for (const cell of row) {
                cell.focused = false;
            }
        }
    }

    /**
     * Unhighlights all cells.
     */
    public unhighlightAll() {
        for (const row of this.cells) {
            for (const cell of row) {
                cell.highlight(false);
            }
        }
    }
}
