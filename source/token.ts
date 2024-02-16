import { Cell } from "./cell.js";
import { Colour } from "./main.js";

/**
 * A player's token. This class is mainly responsible for exposing information about a token.
 */
export class Token {
    /**
     * The token's colour.
     */
    public readonly colour: Colour;

    /**
     * Indicates if the token is alive.
     */
    private _isAlive: boolean = true;

    /**
     * Indicates if the token is a king.
     */
    public isKing: boolean = false;

    /**
     * The token's initial cell.
     */
    private readonly defaultCell: Cell;

    /**
     * The cell the token is on, or null if dead.
     */
    private _cell!: Cell | null;

    /**
     * Creates a new token with a given colour and links it to an initial cell.
     * @param colour The token's colour.
     * @param cell The initial cell the token is on.
     */
    public constructor(colour: Colour, cell: Cell) {
        this.colour = colour;
        this.defaultCell = cell;
        this.cell = cell;
    }

    /**
     * Checks if the token is alive.
     */
    public get isAlive(): boolean {
        return this._isAlive;
    }

    /**
     * Kills the token.
     */
    public kill() {
        this._isAlive = false;
        this._cell = null;
    }

    /**
     * Gets the token's cell.
     * @throws Error if the token is dead and not on a cell.
     */
    public get cell(): Cell {
        if (!this.isAlive) throw new Error("Cannot get cell of dead token");
        return this._cell!;
    }

    /**
     * Moves the token to another cell and removes it from any previous cell.
     */
    public set cell(cell: Cell) {
        this._cell?.removeToken();
        this._cell = cell;
        this._cell.token = this;
    }

    /**
     * Resets the token to its initial position and state.
     */
    public reset() {
        this._isAlive = true;
        this.isKing = false;
        this.cell = this.defaultCell;
    }
}
