import { Board } from "./board.js";
import { Game } from "./game.js";
import { MoveValidator } from "./move-validator.js";
import { Move } from "./move.js";
import { Token } from "./token.js";

/**
 * A diagonal direction for linking cells.
 */
export enum Direction {
    TOP_LEFT = 0,
    TOP_RIGHT = 1,
    BOTTOM_RIGHT = 2,
    BOTTOM_LEFT = 3
}

/**
 * The possible movement directions.
 */
export const directions: Direction[] = [Direction.TOP_LEFT, Direction.TOP_RIGHT, Direction.BOTTOM_RIGHT, Direction.BOTTOM_LEFT];

/**
 * The upward directions.
 */
export const upDirections: Direction[] = [Direction.TOP_LEFT, Direction.TOP_RIGHT];

/**
 * The downward directions.
 */
export const downDirections: Direction[] = [Direction.BOTTOM_LEFT, Direction.BOTTOM_RIGHT];

/**
 * A cell in a board. The cell links to its diagonal neighbours, and keeps track of what token is on it.
 */
export class Cell {
    /**
     * The diagonally adjacent cells, or null if there is none.
     */
    private readonly links: (Cell | null)[] = [null, null, null, null];

    /**
     * The cell's coordinate in the board.
     */
    public readonly position: [number, number];

    /**
     * The token on the cell, or null if no token is on it.
     */
    public token: Token | null = null;

    /**
     * The cell's DOM element.
     */
    public readonly element: HTMLDivElement;

    /**
     * Indicates if the cell is focused.
     */
    public focused: boolean = false;

    /**
     * Creates a new cell.
     * @param row The cell's row index.
     * @param column The cell's column index.
     * @param game The current game.
     */
    public constructor(row: number, column: number, game: Game) {
        this.position = [row, column];
        this.element = document.querySelector(`#cell-${row * Board.SIZE + column}`)!;

        // Highlight valid moves on click
        this.element.addEventListener("click", () => {
            if (game.isOver() || !this.token || this.token!.colour !== game.turn) return;

            game.board.unhighlightAll();

            if (!this.focused) {
                console.log(1);
                game.board.unfocusAll();
                game.nextMove = new Move(this.token, game);
                const moves: Cell[] = (new MoveValidator(game.board)).getValidMoves(this.token);
                for (const move of moves) move.highlight(true);
            } else {
                console.log(2);
                game.nextMove = null;
            }

            this.focused = !this.focused;
        });

        // Click on cell to execute move
        this.element.addEventListener("click", () => {
            const validator: MoveValidator = new MoveValidator(game.board);
            if (game.isOver() || !game.nextMove || !validator.isValidMove(game.nextMove.token, this)) return;

            game.nextMove.execute(this);
            game.nextMove = null;
            game.board.unfocusAll();
            game.board.unhighlightAll();
            console.log(game);
        });
    }

    /**
     * Gets a diagonally adjacent cell.
     * @param direction The link direction.
     * @returns The adjacent cell.
     */
    public getLink(direction: Direction): Cell | null {
        return this.links[direction];
    }

    /**
     * Links an adjacent cell to this cell.
     * @param direction The link direction.
     * @param cell The cell to link.
     * @throws Error if the link already exists.
     */
    public setLink(direction: Direction, cell: Cell) {
        if (this.links[direction]) throw new Error("Cannot override linked cell");
        this.links[direction] = cell;
    }

    /**
     * Checks if a given cell is directly linked to this cell.
     * @param cell The cell to check for.
     * @returns A boolean indicating if the cells are adjacent.
     */
    public isLinkedTo(cell: Cell): boolean {
        return this.links.includes(cell);
    }

    /**
     * Sets the cell as highlighted or unhighlighted.
     * @param highlight Indicates whether to highlight or unhighlight the cell.
     */
    public highlight(highlight: boolean) {
        if (highlight) this.element.classList.add("highlight");
        else this.element.classList.remove("highlight");
    }
}
