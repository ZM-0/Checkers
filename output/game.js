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
     * Checks if the game is over and displays a winner if it is.
     * @returns A boolean indicating if the game is over.
     */
    isOver() {
        const isOver = this.blackPlayer.hasLost() || this.whitePlayer.hasLost();
        if (isOver) {
            this.turnElement.innerText = this.blackPlayer.hasLost() ? "White won" : "Black won";
            document.querySelector("#board").classList.add("disabled");
        }
        return isOver;
    }
    /**
     * Resets the game.
     */
    reset() {
        this.blackPlayer.reset();
        this.whitePlayer.reset();
        this._turn = Colour.BLACK;
        this.turnElement.innerText = "Black starts";
        this.nextMove = null;
    }
}
