import { directions } from "./cell.js";
import { MoveValidator } from "./move-validator.js";
/**
 * Constructs and executes a token move.
 */
export class Move {
    /**
     * The token being moved.
     */
    token;
    /**
     * The game being played.
     */
    game;
    /**
     * A validator for the move.
     */
    validator;
    /**
     * Creates a new move for a token.
     * @param token The token to be moved.
     * @param game The game being played.
     */
    constructor(token, game) {
        this.token = token;
        this.game = game;
        this.validator = new MoveValidator(game.board);
    }
    /**
     * Executes the move to move the token to the given cell.
     * @param end The cell to move the token to.
     * @throws Error if the move is invalid.
     */
    execute(end) {
        if (!this.validator.isValidMove(this.token, end))
            throw new Error("Cannot execute invalid move");
        const isKill = this.isJumpMove(end);
        // Move the token
        const oldCell = this.game.board.get(...this.token.position);
        oldCell.token = null;
        end.token = this.token;
        this.token.position = [...end.position];
        // Check for token kill
        if (isKill) {
            const middle = this.getMiddle(end);
            middle.token.isAlive = false;
            middle.token = null;
        }
        // Check for promotion
        if (this.token.atOtherEnd()) {
            this.token.isKing = true;
        }
        // Check for game over
        if (this.game.isOver()) {
            console.log(`Game over. Winner: ${this.game.getWinner()}`);
        }
        // Check for another chainable jump move
        if (!this.validator.getValidMoves(this.token).some((move) => this.isJumpMove(move))) {
            this.game.switchTurn();
        }
    }
    /**
     * Checks if a move is a jump over another token.
     * @param end The destination cell.
     * @returns A boolean indicating if the move is a jump move.
     * @throws Error if the move is invalid.
     */
    isJumpMove(end) {
        if (!this.validator.isValidMove(this.token, end))
            throw new Error("Invalid move");
        const cell = this.game.board.get(...this.token.position);
        return !cell.isLinkedTo(end);
    }
    /**
     * Gets the middle cell that was jumped over.
     * @returns The cell jumped over.
     * @param end The cell jumped to.
     * @throws Error if the move isn't a jump move.
     */
    getMiddle(end) {
        if (!this.isJumpMove(end))
            throw new Error("Can't get middle cell if not jump move");
        const cell = this.game.board.get(...this.token.position);
        let middle;
        for (const direction of directions) {
            if (cell.getLink(direction)?.getLink(direction) === end) {
                middle = cell.getLink(direction);
                break;
            }
        }
        return middle;
    }
}
