# Checkers

Two-player checkers.

Each player starts with 8 black or white tokens.
Players take turns shifting their tokens diagonally to an adjacent empty space.
If an adjacent space has an opponent's token and the next space is empty,
the token may jump over the opponent's piece and kill it.
Once a token reaches the other side, it is promoted to a king.
A king may move forwards or backwards, while a regular token can only move forwards.
A player wins when they kill all the opponent's tokens or block them all from moving.

## Design

### Functionality

From the problem description, the main functional requirements are:

- Getting user input for moving a token
- Getting the valid moves for a token
- Validating a token move
- Executing a token move
- Promoting a token
- Keeping track of whose turn it is
- Checking if the game is over
- Resetting the game

### Domain Analysis

A domain model is constructed by identifying the main parts of the problem description.
This consists of the domain entities:

- Game
- Board
- Cell
- Player
- Token

Additionally, since there is a good chunk of functionality related to moves and their validation,
two new entities are added to modularise and encapsulate them. They are:

- Move
- MoveValidator

The following is the domain model for this game.

![Domain Model](/documents/Domain%20Model.png "Domain Model")

### Class Diagram

A class diagram is constructed  based on the domain model.
The entities are converted to classes, and in addition there is an enumeration for identifying the player colours.
The class diagram is shown below.

![Class Diagram](/documents/Class%20Diagram.png "Class Diagram")
