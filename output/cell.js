/**
 * A diagonal direction for linking cells.
 */
export var Direction;
(function (Direction) {
    Direction[Direction["TOP_LEFT"] = 0] = "TOP_LEFT";
    Direction[Direction["TOP_RIGHT"] = 1] = "TOP_RIGHT";
    Direction[Direction["BOTTOM_RIGHT"] = 2] = "BOTTOM_RIGHT";
    Direction[Direction["BOTTOM_LEFT"] = 3] = "BOTTOM_LEFT";
})(Direction || (Direction = {}));
/**
 * The possible movement directions.
 */
export const directions = [Direction.TOP_LEFT, Direction.TOP_RIGHT, Direction.BOTTOM_RIGHT, Direction.BOTTOM_LEFT];
/**
 * The upward directions.
 */
export const upDirections = [Direction.TOP_LEFT, Direction.TOP_RIGHT];
/**
 * The downward directions.
 */
export const downDirections = [Direction.BOTTOM_LEFT, Direction.BOTTOM_RIGHT];
/**
 * A cell in a board. The cell links to its diagonal neighbours, and keeps track of what token is on it.
 */
export class Cell {
    /**
     * The diagonally adjacent cells, or null if there is none.
     */
    links = [null, null, null, null];
    /**
     * The cell's coordinate in the board.
     */
    position;
    /**
     * The token on the cell, or null if no token is on it.
     */
    token = null;
    /**
     * Creates a new cell.
     * @param row The cell's row index.
     * @param column The cell's column index.
     */
    constructor(row, column) {
        this.position = [row, column];
    }
    /**
     * Gets a diagonally adjacent cell.
     * @param direction The link direction.
     * @returns The adjacent cell.
     */
    getLink(direction) {
        return this.links[direction];
    }
    /**
     * Links an adjacent cell to this cell.
     * @param direction The link direction.
     * @param cell The cell to link.
     * @throws Error if the link already exists.
     */
    setLink(direction, cell) {
        if (this.links[direction])
            throw new Error("Cannot override linked cell");
        this.links[direction] = cell;
    }
    /**
     * Checks if a given cell is directly linked to this cell.
     * @param cell The cell to check for.
     * @returns A boolean indicating if the cells are adjacent.
     */
    isLinkedTo(cell) {
        return this.links.includes(cell);
    }
}
