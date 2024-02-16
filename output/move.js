import { MoveValidator } from "./move-validator.js";
/**
 * Responsible for executing a token move.
 */
export class Move {
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
