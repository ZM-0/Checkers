import { Colour } from "./colour.js";
/**
 * Gets valid token moves and validates moves.
 */
export class MoveValidator {
    /**
     * Checks if a token is blocked and can't make any moves.
     * @param token The token to check for.
     * @returns A boolean indicating if the token is blocked or not.
     */
    isBlocked(token) {
        if (!token.cell)
            throw new Error("Can't check if token is blocked unless it's on a cell");
        return this.getValidMoves(token.cell).length === 0;
    }
    /**
     * Checks if a given move is valid.
     * @param start The token's cell at the start of the move.
     * @param end The token's cell at the end of the move.
     * @returns A boolean indicating if the move is valid.
     */
    isValidMove(start, end) {
        return this.getValidMoves(start).includes(end);
    }
    /**
     * Gets the valid moves for a token at a given cell.
     * @param start The token's cell at the start of the move.
     * @returns A list of the valid cells to move to.
     * @throws Error if the start cell doesn't have a token.
     */
    getValidMoves(start) {
        if (!start.token)
            throw new Error("Need token on cell to find moves");
        const moves = [];
        const colour = start.token.colour;
        // Check upward cells for moves
        if (colour === Colour.BLACK || start.token.isKing)
            moves.push(...this.getValidUpMoves(start));
        // Check downward cells for moves
        if (colour == Colour.WHITE || start.token.isKing)
            moves.push(...this.getValidDownMoves(start));
        return moves;
    }
    /**
     * Gets the valid moves of a token in the upwards direction.
     * @param start The token's current cell.
     */
    getValidUpMoves(start) {
        const moves = [];
        const topLeftMove = this.getValidMove(start, start.topLeft, start.topLeft?.topLeft);
        if (topLeftMove)
            moves.push(topLeftMove);
        const topRightMove = this.getValidMove(start, start.topRight, start.topRight?.topRight);
        if (topRightMove)
            moves.push(topRightMove);
        return moves;
    }
    /**
     * Gets the valid moves of a token in the downwards direction.
     * @param start The token's current cell.
     */
    getValidDownMoves(start) {
        const moves = [];
        const bottomLeftMove = this.getValidMove(start, start.bottomLeft, start.bottomLeft?.bottomLeft);
        if (bottomLeftMove)
            moves.push(bottomLeftMove);
        const bottomRightMove = this.getValidMove(start, start.bottomRight, start.bottomRight?.bottomRight);
        if (bottomRightMove)
            moves.push(bottomRightMove);
        return moves;
    }
    /**
     * Finds the valid cell to move to, if any, in a given direction.
     * The cells in the chosen direction must be explicitly provided.
     * @param start The token's current cell.
     * @param next1 The next adjacent cell.
     * @param next2 The second-next adjacent cell.
     * @returns The valid cell to move to, or null if there is no valid move in the chosen direction.
     */
    getValidMove(start, next1, next2) {
        if (next1 && !next1.token)
            return next1;
        if (next1 && next1.token.colour !== start.token.colour && next2 && !next2.token)
            return next2;
        return null;
    }
}
