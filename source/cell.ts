import { Board } from "./board.js";
import { Game } from "./game.js";
import { MoveValidator } from "./move-validator.js";
import { Move } from "./move.js";
import { Token } from "./token.js";

/**
 * A diagonal direction to relate cells.
 */
export enum Direction {
    TOP_LEFT = 0,
    TOP_RIGHT = 1,
    BOTTOM_RIGHT = 2,
    BOTTOM_LEFT = 3
}

/**
 * A wrapper for a cell which links a diagonal chain of cells.
 */
export class Link {
    /**
     * The cell.
     */
    public readonly cell: Cell;

    /**
     * The next link in the chain or null if there are no more links.
     */
    private _next: Link | null;

    /**
     * Creates a new link.
     * @param cell The cell contained.
     * @param next The next link in the chain.
     */
    public constructor(cell: Cell, next: Link | null = null) {
        this.cell = cell;
        this._next = next;
    }

    /**
     * Gets the next link.
     */
    public get next(): Link | null {
        return this._next;
    }

    /**
     * Sets the next link.
     * @throws Error if the link is already set.
     */
    public set next(next: Link) {
        if (this._next) throw new Error("Next link already set");
        this._next = next;
    }
}

/**
 * A cell in a board. The cell knows about its diagonal neighbours and what token is on it.
 */
export class Cell {
    /**
     * Links to the diagonally adjacent cells. The links are in clockwise order starting from the top-left.
     * If a link doesn't exist, null is stored.
     */
    private readonly links: (Link | null)[] = [null, null, null, null];

    /**
     * The token on this cell or null if no token is on it.
     */
    private _token: Token | null = null;

    /**
     * The DOM element for the cell.
     */
    public readonly element: HTMLDivElement

    /**
     * Indicates if the cell is focused.
     */
    public focused: boolean = false;

    private row: number;
    private column: number;

    /**
     * Creates a new cell and links it to the DOM.
     * @param row The cell's row index.
     * @param column The cell's column index.
     * @param game The current game.
     */
    public constructor(row: number, column: number, game: Game) {
        this.element = document.querySelector(`#cell-${row * Board.SIZE + column}`)!;
        this.row = row;
        this.column = column;

        // Highlight or unhighlight valid moves on click
        this.element.addEventListener("click", () => {
            if (!this.token || this.token.colour !== game.turn) return;

            if (!this.focused) {
                game.board.unfocusAll();
                game.board.unhighlightAll();
                game.nextMove = new Move(this, game);
                const moves: Cell[] = (new MoveValidator()).getValidMoves(this);
                for (const move of moves) move.highlight(true);
            } else {
                game.board.unhighlightAll();
                game.nextMove = null;
            }

            this.focused = !this.focused;
        });

        // Click on a cell to complete and execute a move
        this.element.addEventListener("click", () => {
            if (!game.nextMove || this.token || !(new MoveValidator()).isValidMove(game.nextMove.start, this)) return;
            console.log(this);
            game.nextMove.end = this;
            game.nextMove.execute();
            console.log("Move executed");
        });
    }

    /**
     * Gets a link in a specific direction.
     * @param direction The direction of the link.
     * @returns The link in the given direction, or null if there is no link.
     */
    public get(direction: Direction): Link | null {
        return this.links[direction];
    }

    /**
     * Sets a link in a specific direction.
     * @param direction The direction of the link.
     * @param link The link to set.
     * @throws Error if the given link has already been set.
     */
    public set(direction: Direction, link: Link) {
        if (this.links[direction]) throw new Error("Cannot override existing link");
        this.links[direction] = link;
    }

    /**
     * Gets the token on the cell, or null if there is no token.
     */
    public get token(): Token | null {
        return this._token;
    }

    /**
     * Sets the token on the cell, or sets null to remove any token from the cell.
     * @throws Error when trying to set a token and there is already a token.
     */
    public set token(token: Token | null) {
        if (this._token) throw new Error("Can't have two tokens on one cell");
        this._token = token;
    }

    /**
     * Checks if a cell is immediately adjacent to this one.
     * @param cell The cell to check for.
     * @returns A boolean indicating if the given cell is immediately adjacent.
     */
    public isAdjacent(cell: Cell): boolean {
        return this.links.some((link: Link | null) => link && link.cell === cell);
    }

    /**
     * Sets whether the cell is highlighted.
     * @param highlight A boolean indicating whether to highlight or unhighlight the cell.
     */
    public highlight(highlight: boolean) {
        if (highlight) this.element.classList.add("highlight");
        else this.element.classList.remove("highlight");
    }
}
