import { Token } from "./token.js";

/**
 * A diagonal direction for linking cells.
 */
export enum Direction {
    TOP_LEFT = 0,
    TOP_RIGHT = 1,
    BOTTOM_RIGHT = 2,
    BOTTOM_LEFT = 3
}

/**
 * The possible movement directions.
 */
export const directions: Direction[] = [Direction.TOP_LEFT, Direction.TOP_RIGHT, Direction.BOTTOM_RIGHT, Direction.BOTTOM_LEFT];

/**
 * The upward directions.
 */
export const upDirections: Direction[] = [Direction.TOP_LEFT, Direction.TOP_RIGHT];

/**
 * The downward directions.
 */
export const downDirections: Direction[] = [Direction.BOTTOM_LEFT, Direction.BOTTOM_RIGHT];

/**
 * A cell in a board. The cell links to its diagonal neighbours, and keeps track of what token is on it.
 */
export class Cell {
    /**
     * The diagonally adjacent cells, or null if there is none.
     */
    private readonly links: (Cell | null)[] = [null, null, null, null];

    /**
     * The token on the cell, or null if no token is on it.
     */
    public token: Token | null = null;

    /**
     * Creates a new cell.
     */
    public constructor() {
        
    }

    /**
     * Gets a diagonally adjacent cell.
     * @param direction The link direction.
     * @returns The adjacent cell.
     */
    public getLink(direction: Direction): Cell | null {
        return this.links[direction];
    }

    /**
     * Links an adjacent cell to this cell.
     * @param direction The link direction.
     * @param cell The cell to link.
     * @throws Error if the link already exists.
     */
    public setLink(direction: Direction, cell: Cell) {
        if (this.links[direction]) throw new Error("Cannot override linked cell");
        this.links[direction] = cell;
    }
}
