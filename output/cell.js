import { Board } from "./board.js";
import { MoveValidator } from "./move-validator.js";
import { Move } from "./move.js";
/**
 * A diagonal direction to relate cells.
 */
export var Direction;
(function (Direction) {
    Direction[Direction["TOP_LEFT"] = 0] = "TOP_LEFT";
    Direction[Direction["TOP_RIGHT"] = 1] = "TOP_RIGHT";
    Direction[Direction["BOTTOM_RIGHT"] = 2] = "BOTTOM_RIGHT";
    Direction[Direction["BOTTOM_LEFT"] = 3] = "BOTTOM_LEFT";
})(Direction || (Direction = {}));
/**
 * A wrapper for a cell which links a diagonal chain of cells.
 */
export class Link {
    /**
     * The cell.
     */
    cell;
    /**
     * The next link in the chain or null if there are no more links.
     */
    _next;
    /**
     * Creates a new link.
     * @param cell The cell contained.
     * @param next The next link in the chain.
     */
    constructor(cell, next = null) {
        this.cell = cell;
        this._next = next;
    }
    /**
     * Gets the next link.
     */
    get next() {
        return this._next;
    }
    /**
     * Sets the next link.
     * @throws Error if the link is already set.
     */
    set next(next) {
        if (this._next)
            throw new Error("Next link already set");
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
    links = [null, null, null, null];
    /**
     * The token on this cell or null if no token is on it.
     */
    _token = null;
    /**
     * The DOM element for the cell.
     */
    element;
    /**
     * Indicates if the cell is focused.
     */
    focused = false;
    row;
    column;
    /**
     * Creates a new cell and links it to the DOM.
     * @param row The cell's row index.
     * @param column The cell's column index.
     * @param game The current game.
     */
    constructor(row, column, game) {
        this.element = document.querySelector(`#cell-${row * Board.SIZE + column}`);
        this.row = row;
        this.column = column;
        // Highlight or unhighlight valid moves on click
        this.element.addEventListener("click", () => {
            if (!this.token || this.token.colour !== game.turn)
                return;
            if (!this.focused) {
                game.board.unfocusAll();
                game.board.unhighlightAll();
                game.nextMove = new Move(this, game);
                const moves = (new MoveValidator()).getValidMoves(this);
                for (const move of moves)
                    move.highlight(true);
            }
            else {
                game.board.unhighlightAll();
                game.nextMove = null;
            }
            this.focused = !this.focused;
        });
        // Click on a cell to complete and execute a move
        this.element.addEventListener("click", () => {
            if (!game.nextMove || this.token || !(new MoveValidator()).isValidMove(game.nextMove.start, this))
                return;
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
    get(direction) {
        return this.links[direction];
    }
    /**
     * Sets a link in a specific direction.
     * @param direction The direction of the link.
     * @param link The link to set.
     * @throws Error if the given link has already been set.
     */
    set(direction, link) {
        if (this.links[direction])
            throw new Error("Cannot override existing link");
        this.links[direction] = link;
    }
    /**
     * Gets the token on the cell, or null if there is no token.
     */
    get token() {
        return this._token;
    }
    /**
     * Sets the token on the cell, or sets null to remove any token from the cell.
     * @throws Error when trying to set a token and there is already a token.
     */
    set token(token) {
        if (this._token)
            throw new Error("Can't have two tokens on one cell");
        this._token = token;
    }
    /**
     * Checks if a cell is immediately adjacent to this one.
     * @param cell The cell to check for.
     * @returns A boolean indicating if the given cell is immediately adjacent.
     */
    isAdjacent(cell) {
        return this.links.some((link) => link && link.cell === cell);
    }
    /**
     * Sets whether the cell is highlighted.
     * @param highlight A boolean indicating whether to highlight or unhighlight the cell.
     */
    highlight(highlight) {
        if (highlight)
            this.element.classList.add("highlight");
        else
            this.element.classList.remove("highlight");
    }
}
