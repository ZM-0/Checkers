import { Colour } from "./main.js";
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
    _end;
    /**
     * The game object.
     */
    game;
    /**
     * Creates a new move with a start cell.
     * @param start The token's cell at the move start.
     * @param game The game object.
     */
    constructor(start, game) {
        this.start = start;
        this.game = game;
    }
    /**
     * Sets the end cell of the move.
     */
    set end(end) {
        this._end = end;
    }
    /**
     * Executes the move.
     * @throws Error if the move isn't valid.
     */
    execute() {
        const validator = new MoveValidator();
        if (!validator.isValidMove(this.start, this.end))
            throw new Error("Cannot execute invalid move");
        // Move the token
        const token = this.start.token;
        token.cell = this.end;
        // Check for kill
        const isKill = !this.start.isAdjacent(this.end);
        if (isKill)
            this.getMiddle().token.kill();
        // Check for promotion
        if (this.isAtEdge(token))
            token.isKing = true;
        // Check for another jump move to chain
        const nextMoves = validator.getValidMoves(token.cell);
        let isJumpMove = false;
        for (const move of nextMoves) {
            if (!this.start.isAdjacent(move)) {
                isJumpMove = true;
                break;
            }
        }
        if (!isJumpMove)
            this.game.switchTurn();
        // Check if the game is over
        if (this.game.isOver())
            console.log("Game Over!");
    }
    /**
     * Checks if a token has reached the opposite edge of the board.
     * @param token The token to check for.
     * @returns A boolean indicating if the token is at the opposing edge of the board.
     */
    isAtEdge(token) {
        return token.colour === Colour.BLACK && !token.cell.topLeft && !token.cell.topRight || token.colour === Colour.WHITE && !token.cell.bottomLeft && !token.cell.bottomRight;
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
