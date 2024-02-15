// ====================================================================================================
// 
// Player and cell colour
// 
// ====================================================================================================


/**
 * Identifies the colour of the cells and players.
 */
enum Colour {
    BLACK,
    WHITE
}


// ====================================================================================================
// 
// Cell
// 
// ====================================================================================================


/**
 * A cell or position in the 8x8 gameboard.
 */
class Cell {
    /**
     * The diagonally adjacent cells as a 2D array. The first subarray are cells above,
     * the second subarray are the cells below. The first in each subarray is the left cell.
     */
    private _adjacentCells: Cell[][] | null = null;

    /**
     * The token on this cell or null if no token is on it.
     */
    private _token: Token | null = null;

    /**
     * Gets the adjacent cells.
     */
    public get adjacentCells(): Cell[][] | null {
        return this._adjacentCells;
    }

    /**
     * Sets the adjacent cells for this cell.
     */
    public set adjacentCells(cells: Cell[][]) {
        if (this._adjacentCells !== null) return;
        this._adjacentCells = cells;
    }

    /**
     * Gets the token on the cell, or null if there is no token.
     */
    public get token(): Token | null {
        return this._token;
    }

    /**
     * Sets the token on the cell. Does nothing if there is already a token on it.
     */
    public set token(token: Token) {
        if (this._token !== null) return;
        this._token = token;
    }

    /**
     * Checks if the cell has a token.
     * @returns A boolean indicating if the cell has a token.
     */
    public hasToken(): boolean {
        return this._token !== null;
    }

    /**
     * Removes the token from the cell, if any.
     */
    public removeToken() {
        this._token = null;
    }
}


// ====================================================================================================
// 
// Token
// 
// ====================================================================================================


class Token {

}


// ====================================================================================================
// 
// Main script
// 
// ====================================================================================================


// Colour the board cells

let colour: Colour = Colour.BLACK;

for (let row: number = 0; row < 8; row++) {
    for (let column: number = 0; column < 8; column++) {
        const cell: HTMLDivElement = document.querySelector(`#cell-${row * 8 + column}`)!;
        cell.style.backgroundColor = colour === Colour.BLACK ? "#000" : "#FFF";
        colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
    }

    colour = colour === Colour.BLACK ? Colour.WHITE : Colour.BLACK;
}
