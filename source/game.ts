import { Board } from "./board.js";
import { Colour } from "./main";
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
    private readonly board: Board;

    /**
     * Indicates whose turn it is.
     */
    private turn: Colour;

    /**
     * Creates a new game with two players and a board, and sets black to start.
     */
    public constructor() {
        this.board = new Board();
        this.whitePlayer = new Player(Colour.WHITE, this.board);
        this.blackPlayer = new Player(Colour.BLACK, this.board);
        this.turn = Colour.BLACK;
    }

    /**
     * Switches the turn.
     */
    public switchTurn() {
        this.turn = this.turn === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
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
        this.turn = Colour.BLACK;
    }
}
