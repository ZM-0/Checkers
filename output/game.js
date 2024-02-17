import { Board } from "./board.js";
import { Colour } from "./colour.js";
import { Player } from "./player.js";
/**
 * A game of checkers. Manages the game state and checks for the game end.
 */
export class Game {
    /**
     * The black player.
     */
    blackPlayer;
    /**
     * The white player.
     */
    whitePlayer;
    /**
     * The gameboard.
     */
    board;
    /**
     * Indicates whose turn it is.
     */
    _turn = Colour.BLACK;
    /**
     * Creates a new game.
     */
    constructor() {
        this.blackPlayer = new Player(Colour.BLACK);
        this.whitePlayer = new Player(Colour.WHITE);
        this.board = new Board();
    }
    /**
     * Gets whose turn it is.
     */
    get turn() {
        return this._turn;
    }
    /**
     * Toggles the turn between the players.
     */
    switchTurn() {
        this._turn = this.turn === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
    }
    /**
     * Checks if the game is over.
     * @returns A boolean indicating if the game is over.
     */
    isOver() {
        return this.blackPlayer.hasLost() || this.whitePlayer.hasLost();
    }
    /**
     * Gets the winner of the game.
     * @returns The colour of the winner.
     * @throws Error if the game isn't over.
     */
    getWinner() {
        if (!this.isOver())
            throw new Error("Can't get winner as game isn't over");
        return this.blackPlayer.hasLost() ? Colour.WHITE : Colour.BLACK;
    }
}
