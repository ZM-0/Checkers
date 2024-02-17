import { Cell } from "./cell.js";
import { MoveValidator } from "./move-validator.js";
import { Token } from "./token.js";

/**
 * Responsible for executing a token move.
 */
export class Move {
    /**
     * The start cell of the move.
     */
    private start: Cell;

    /**
     * The end cell of the move.
     */
    private _end!: Cell;

    /**
     * Creates a new move with a start cell.
     * @param start The token's cell at the move start.
     */
    public constructor(start: Cell) {
        this.start = start;
    }

    /**
     * Sets the end cell of the move.
     */
    public set end(end: Cell) {
        this._end = end;
    }

    /**
     * Executes the move.
     * @throws Error if the move isn't valid.
     */
    public execute() {
        const validator: MoveValidator = new MoveValidator();
        if (!validator.isValidMove(this.start, this.end)) throw new Error("Cannot execute invalid move");

        // Move the token
        this.start.token!.cell = this.end;

        // Check for kill
        const isKill: boolean = !this.start.isAdjacent(this.end);
        if (isKill) this.getMiddle()!.token!.kill();
    }

    /**
     * Gets the cell jumped over, if any.
     * @returns The cell jumped over in the move, or null if no cell was jumped over.
     */
    private getMiddle(): Cell | null {
        if (this.start.topLeft?.topLeft === this.end) return this.start.topLeft;
        if (this.start.topRight?.topRight === this.end) return this.start.topRight;
        if (this.start.bottomLeft?.bottomLeft === this.end) return this.start.bottomLeft;
        if (this.start.bottomRight?.bottomRight === this.end) return this.start.bottomRight;

        return null;
    }
}
