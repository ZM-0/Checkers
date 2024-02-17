import { Cell, directions } from "./cell.js";
import { Game } from "./game.js";
import { MoveValidator } from "./move-validator.js";
import { Token } from "./token.js";

/**
 * Constructs and executes a token move.
 */
export class Move {
    /**
     * The token being moved.
     */
    public readonly token: Token;

    /**
     * The start cell.
     */
    private readonly start: Cell;

    /**
     * The game being played.
     */
    private readonly game: Game;

    /**
     * A validator for the move.
     */
    private readonly validator: MoveValidator;

    /**
     * Creates a new move for a token.
     * @param token The token to be moved.
     * @param game The game being played.
     */
    public constructor(token: Token, game: Game) {
        this.token = token;
        this.start = game.board.get(...token.position);
        this.game = game;
        this.validator = new MoveValidator(game.board);
    }

    /**
     * Executes the move to move the token to the given cell.
     * @param end The cell to move the token to.
     * @throws Error if the move is invalid.
     */
    public execute(end: Cell) {
        if (!this.validator.isValidMove(this.token, end)) throw new Error("Cannot execute invalid move");

        const isKill: boolean = this.validator.isJumpMove(this.start, end);

        // Move the token
        this.start.token = null;
        this.start.element.replaceChildren();
        end.token = this.token;
        end.element.append(this.token.element);
        this.token.position = [...end.position];

        // Check for token kill
        if (isKill) {
            const middle: Cell = this.getMiddle(this.start, end);
            middle.token!.isAlive = false;
            middle.token = null;
            middle.element.replaceChildren();
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
        if (!this.validator.getValidMoves(this.token).some((move: Cell): boolean => this.validator.isJumpMove(end, move))) {
            this.game.switchTurn();
        }
    }

    /**
     * Gets the middle cell that was jumped over.
     * @param start The start cell.
     * @param end The cell jumped to.
     * @returns The cell jumped over.
     */
    private getMiddle(start: Cell, end: Cell): Cell {
        let middle: Cell;

        for (const direction of directions) {
            if (start.getLink(direction)?.getLink(direction) === end) {
                middle = start.getLink(direction)!;
                break;
            }
        }

        return middle!;
    }
}
