import { Board } from "./board.js";
import { Colour } from "./colour.js";
import { Move } from "./move.js";
import { Player } from "./player.js";

/**
 * A game of checkers. Manages the overall game state.
 */
export class Game {
    /**
     * The white player.
     */
    private readonly whitePlayer: Player;

    /**
     * The black player.
     */
    private readonly blackPlayer: Player;

    /**
     * The gameboard.
     */
    public readonly board: Board;

    /**
     * Indicates whose turn it is.
     */
    private _turn: Colour;

    /**
     * The next move to execute.
     */
    public nextMove!: Move;

    /**
     * Creates a new game with two players and a board, and sets black to start.
     */
    public constructor() {
        this.board = new Board(this);
        this.whitePlayer = new Player(Colour.WHITE, this.board);
        this.blackPlayer = new Player(Colour.BLACK, this.board);
        this._turn = Colour.BLACK;
    }

    /**
     * Gets the current turn.
     */
    public get turn(): Colour {
        return this._turn;
    }

    /**
     * Switches the turn.
     */
    public switchTurn() {
        this._turn = this.turn === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
    }

    /**
     * Checks if the game is over and a player has lost.
     * @returns A boolean indicating if the game is over.
     */
    public isOver(): boolean {
        return this.whitePlayer.hasLost() || this.blackPlayer.hasLost();
    }

    /**
     * Resets the game.
     */
    public reset() {
        this.whitePlayer.reset();
        this.blackPlayer.reset();
        this._turn = Colour.BLACK;
    }
}
