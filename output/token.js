/**
 * A player's token.
 */
export class Token {
    /**
     * The token's colour.
     */
    colour;
    /**
     * Indicates if the token is alive.
     */
    isAlive = true;
    /**
     * Indicates if the token is a king.
     */
    isKing = false;
    /**
     * The token's initial coordinate.
     */
    defaultPosition;
    /**
     * The token's current coordinate.
     */
    position;
    /**
     * Creates a new token.
     * @param colour The token's colour.
     * @param row The token's initial row.
     * @param column The token's initial column.
     */
    constructor(colour, row, column) {
        this.colour = colour;
        this.defaultPosition = [row, column];
        this.position = [row, column];
    }
}
