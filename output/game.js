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
     * The turn indicator element.
     */
    turnElement;
    /**
     * The next move.
     */
    nextMove = null;
    /**
     * Creates a new game.
     */
    constructor() {
        this.board = new Board(this);
        this.blackPlayer = new Player(Colour.BLACK, this.board);
        this.whitePlayer = new Player(Colour.WHITE, this.board);
        this.turnElement = document.querySelector("#turn-indicator");
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
        this.turnElement.innerText = this.turn === Colour.BLACK ? "Black's turn" : "White's turn";
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
