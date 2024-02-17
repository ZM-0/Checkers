import { Board } from "./board.js";
import { Colour } from "./colour.js";

/**
 * A player's token.
 */
export class Token {
    /**
     * The token's colour.
     */
    public readonly colour: Colour;

    /**
     * Indicates if the token is alive.
     */
    public isAlive: boolean = true;

    /**
     * Indicates if the token is a king.
     */
    public isKing: boolean = false;

    /**
     * The token's initial coordinate.
     */
    private readonly defaultPosition: [number, number];

    /**
     * The token's current coordinate.
     */
    public position: [number, number];

    /**
     * The token's DOM element.
     */
    public readonly element: HTMLElement;
    
    /**
     * Creates a new token.
     * @param colour The token's colour.
     * @param row The token's initial row.
     * @param column The token's initial column.
     */
    public constructor(colour: Colour, row: number, column: number) {
        this.colour = colour;
        this.defaultPosition = [row, column];
        this.position = [row, column];
        this.element = document.querySelector(`#cell-${row * Board.SIZE + column} > i`)!;
    }

    /**
     * Checks if the token is at the opposite edge of the board.
     * @returns A boolean indicating if the token has reached the other end.
     */
    public atOtherEnd(): boolean {
        return this.colour === Colour.BLACK && this.position[0] === 0 || this.colour === Colour.WHITE && this.position[0] === Board.SIZE - 1;
    }
}
