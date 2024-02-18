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
     * The turn indicator element.
     */
    public readonly turnElement: HTMLElement;

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
        this.turnElement = document.querySelector("#turn-indicator")!;
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
        this.turnElement.innerText = this.turn === Colour.BLACK ? "Black's turn" : "White's turn";
    }

    /**
     * Checks if the game is over and displays a winner if it is.
     * @returns A boolean indicating if the game is over.
     */
    public isOver(): boolean {
        const isOver: boolean = this.blackPlayer.hasLost() || this.whitePlayer.hasLost();

        if (isOver) {
            this.turnElement.innerText = this.blackPlayer.hasLost() ? "White won" : "Black won";
            document.querySelector("#board")!.classList.add("disabled");
        }
        
        return isOver;
    }

    /**
     * Resets the game.
     */
    public reset() {
        this.blackPlayer.reset();
        this.whitePlayer.reset();
        this._turn = Colour.BLACK;
        this.turnElement.innerText = "Black starts";
        this.nextMove = null;
    }
}
