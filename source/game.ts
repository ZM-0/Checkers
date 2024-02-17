import { Board } from "./board.js";
import { Colour } from "./colour.js";
import { Move } from "./move.js";
import { Player } from "./player.js";

/**
 * A game of checkers. Manages the game state and checks for the game end.
 */
export class Game {
    /**
     * The black player.
     */
    private readonly blackPlayer: Player;

    /**
     * The white player.
     */
    private readonly whitePlayer: Player;

    /**
     * The gameboard.
     */
    public readonly board: Board;

    /**
     * Indicates whose turn it is.
     */
    private _turn: Colour = Colour.BLACK;

    /**
     * The next move.
     */
    public nextMove: Move | null = null;

    /**
     * Creates a new game.
     */
    public constructor() {
        this.board = new Board(this);
        this.blackPlayer = new Player(Colour.BLACK, this.board);
        this.whitePlayer = new Player(Colour.WHITE, this.board);
    }

    /**
     * Gets whose turn it is.
     */
    public get turn(): Colour {
        return this._turn;
    }

    /**
     * Toggles the turn between the players.
     */
    public switchTurn() {
        this._turn = this.turn === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
    }

    /**
     * Checks if the game is over.
     * @returns A boolean indicating if the game is over.
     */
    public isOver(): boolean {
        return this.blackPlayer.hasLost() || this.whitePlayer.hasLost();
    }

    /**
     * Gets the winner of the game.
     * @returns The colour of the winner.
     * @throws Error if the game isn't over.
     */
    public getWinner(): Colour {
        if (!this.isOver()) throw new Error("Can't get winner as game isn't over");
        return this.blackPlayer.hasLost() ? Colour.WHITE : Colour.BLACK;
    }
}
