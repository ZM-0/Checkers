import { Cell, Direction, Link, directions } from "./cell.js";
import { Colour } from "./colour.js";
import { Token } from "./token.js";

/**
 * Gets valid token moves and validates moves.
 */
export class MoveValidator {
    // /**
    //  * Checks if a token is blocked and can't make any moves.
    //  * @param token The token to check for.
    //  * @returns A boolean indicating if the token is blocked or not.
    //  */
    // public isBlocked(token: Token): boolean {
    //     if (!token.cell) throw new Error("Can't check if token is blocked unless it's on a cell");
    //     return this.getValidMoves(token.cell).length === 0;
    // }

    /**
     * Checks if a given move is valid.
     * @param start The token's cell at the start of the move.
     * @param end The token's cell at the end of the move.
     * @returns A boolean indicating if the move is valid.
     */
    public isValidMove(start: Cell, end: Cell): boolean {
        return this.getValidMoves(start).includes(end);
    }

    /**
     * Gets the valid moves for a token at a given cell.
     * @param start The token's cell at the start of the move.
     * @returns A list of the valid cells to move to.
     * @throws Error if the start cell doesn't have a token.
     */
    public getValidMoves(start: Cell): Cell[] {
        if (!start.token) throw new Error("Need token on cell to find moves");
        const moves: Cell[] = [];

        for (const direction of directions) {
            if (!this.isValidDirection(direction, start.token)) break;

            const next1: Link | null = start.get(direction);
            const next2: Link | null | undefined = next1?.next;

            if (next1 && !next1.cell.token) {
                moves.push(next1.cell);
            } else if (next1 && next1.cell.token!.colour !== start.token!.colour && next2 && !next2.cell.token) {
                moves.push(next2.cell);
            }
        }

        return moves;
    }

    /**
     * Checks if a direction is valid for a token.
     * @param direction The direction to move in.
     * @param token The token to move.
     * @returns A boolean indicating if the direction is valid for the token.
     */
    private isValidDirection(direction: Direction, token: Token): boolean {
        if (token.isKing) return true;

        if (token.colour === Colour.BLACK && (direction === Direction.TOP_LEFT || direction === Direction.TOP_RIGHT)) {
            return true;
        }

        if (token.colour === Colour.WHITE && (direction === Direction.BOTTOM_LEFT || direction === Direction.BOTTOM_RIGHT)) {
            return true;
        }

        return false;
    }
}
