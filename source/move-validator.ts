import { Board } from "./board.js";
import { Cell, Direction, directions, downDirections, upDirections } from "./cell.js";
import { Colour } from "./colour.js";
import { Token } from "./token.js";

/**
 * Gets valid token moves and validates moves.
 */
export class MoveValidator {
    /**
     * The board being played on.
     */
    private readonly board: Board;

    /**
     * Creates a new move validator.
     * @param board The board being played on.
     */
    public constructor(board: Board) {
        this.board = board;
    }
    
    /**
     * Checks if a token is blocked and can't make any moves.
     * @param token The token to check for.
     * @returns A boolean indicating if the token is blocked.
     */
    public isBlocked(token: Token): boolean {
        return this.getValidMoves(token).length === 0;
    }

    /**
     * Checks if a move for a given token is valid.
     * @param token The token to check for.
     * @param end The destination cell for the token.
     * @returns A boolean indicating if the move is valid.
     */
    public isValidMove(token: Token, end: Cell): boolean {
        return this.getValidMoves(token).includes(end);
    }

    /**
     * Gets the valid destination cells for a token.
     * @param token The token to check for.
     * @returns A list of the valid destination cells.
     */
    public getValidMoves(token: Token): Cell[] {
        const cell: Cell = this.board.get(...token.position);
        const moves: Cell[] = [];

        // Check for moves in all directions
        for (const direction of directions) {
            if (!this.isValidDirection(token, direction)) continue;

            const nextCell: Cell | null = cell.getLink(direction);
            const jumpCell: Cell | null | undefined = nextCell?.getLink(direction);

            if (nextCell && !nextCell.token) {
                moves.push(nextCell);
            } else if (nextCell && nextCell.token!.colour !== token.colour && jumpCell && !jumpCell.token) {
                moves.push(jumpCell);
            }
        }

        return moves;
    }

    /**
     * Checks if a token can move in a given direction by the game rules.
     * @param token The token to check for.
     * @param direction The direction to move in.
     * @returns A boolean indicating if the token can move in the given direction.
     */
    private isValidDirection(token: Token, direction: Direction): boolean {
        return token.isKing || token.colour === Colour.BLACK && upDirections.includes(direction) || token.colour === Colour.WHITE && downDirections.includes(direction);
    }
}
