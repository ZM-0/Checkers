import { Cell } from "./cell.js";
import { Colour } from "./colour.js";
import { Game } from "./game.js";
import { MoveValidator } from "./move-validator.js";
import { Token } from "./token.js";

/**
 * Responsible for executing a token move.
 */
export class Move {
    /**
     * The start cell of the move.
     */
    public readonly start: Cell;

    /**
     * The end cell of the move.
     */
    private _end!: Cell;

    /**
     * The game object.
     */
    private readonly game: Game;

    /**
     * Creates a new move with a start cell.
     * @param start The token's cell at the move start.
     * @param game The game object.
     */
    public constructor(start: Cell, game: Game) {
        this.start = start;
        this.game = game;
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
        if (!validator.isValidMove(this.start, this._end)) throw new Error("Cannot execute invalid move");

        // Move the token
        const token: Token = this.start.token!;
        token.cell = this._end;

        // Check for kill
        const isKill: boolean = !this.start.isAdjacent(this._end);
        if (isKill) this.getMiddle()!.token!.kill();

        // Check for promotion
        if (this.isAtEdge(token)) token.isKing = true;

        // Check for another jump move to chain
        const nextMoves: Cell[] = validator.getValidMoves(token.cell);
        let isJumpMove: boolean = false;

        for (const move of nextMoves) {
            if (!this.start.isAdjacent(move)) {
                isJumpMove = true;
                break;
            }
        }

        if (!isJumpMove) this.game.switchTurn();

        // Check if the game is over
        if (this.game.isOver()) console.log("Game Over!");
    }

    /**
     * Checks if a token has reached the opposite edge of the board.
     * @param token The token to check for.
     * @returns A boolean indicating if the token is at the opposing edge of the board.
     */
    private isAtEdge(token: Token): boolean {
        return token.colour === Colour.BLACK && !token.cell.topLeft && !token.cell.topRight || token.colour === Colour.WHITE && !token.cell.bottomLeft && !token.cell.bottomRight;
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
