## General Functionality
- Can start the game without errors.
- Displays welcome message, art, and game instructions on start.

## Ship Placement
- Accepts player input for ship placement.
- Correctly places ships randomly for the AI.

## Gameplay
- Reveals hit or miss on the board.
- Tracks and displays the remaining ships for both player and AI.
- Ends the game when all ships for one side are sunk.
- Maintains text alignment and readability throughout the game.

## Game Flow
- Alternates turns between player and AI correctly.
- Handles endgame conditions accurately (player victory, AI victory).

## Edge Cases
- Handles invalid inputs gracefully.
	- ship placed at <1
	- ship placed at >8
	- ship placed at i or later
	- shot at <1
	- shot at >8
	- shot at i or later
- Handles unexpected input.
	- Handle zero-length input.
	- Handle input with invalid characters.

- Try to shoot at the same spot twice
- Try to place a ship on top of another ship


## Error Handling
- Displays appropriate error messages for invalid inputs.
- Does not crash or hang with invalid inputs.
