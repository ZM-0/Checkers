import { Board } from "./board.js";
import { Colour } from "./colour.js";
import { Player } from "./player.js";
/**
 * A game of checkers. Manages the overall game state.
 */
export class Game {
    /**
     * The white player.
     */
    whitePlayer;
    /**
     * The black player.
     */
    blackPlayer;
    /**
     * The gameboard.
     */
    board;
    /**
     * Indicates whose turn it is.
     */
    _turn;
    /**
     * The next move to execute.
     */
    nextMove;
    /**
     * Creates a new game with two players and a board, and sets black to start.
     */
    constructor() {
        this.board = new Board(this);
        this.whitePlayer = new Player(Colour.WHITE, this.board);
        this.blackPlayer = new Player(Colour.BLACK, this.board);
        this._turn = Colour.BLACK;
    }
    /**
     * Gets the current turn.
     */
    get turn() {
        return this._turn;
    }
    /**
     * Switches the turn.
     */
    switchTurn() {
        this._turn = this.turn === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
    }
    /**
     * Checks if the game is over and a player has lost.
     * @returns A boolean indicating if the game is over.
     */
    isOver() {
        return this.whitePlayer.hasLost() || this.blackPlayer.hasLost();
    }
    /**
     * Resets the game.
     */
    reset() {
        this.whitePlayer.reset();
        this.blackPlayer.reset();
        this._turn = Colour.BLACK;
    }
}
