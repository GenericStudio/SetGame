Set Game
--------

A simple game of Match-3

Requirements:
-------------
The app uses Node, so you must have a recent version of Node ( Developed with 4.2.6 )

Installation:
-------------
1. clone repo
2. run
  * npm install
3. run
  * node node_app.js
4. Navigate to http://localhost:3000


Instructions to Play:
---------------------

1. Click **Start** to begin a new game, or **Restart** to reset the game.
2. Match sets of 3 cards where each Set contains either all-one, or one-of-each value for each of its 4 properties: color, shape, shading, and number
3. When a valid set is selected, you can click **Claim Set** to remove the set from the board.
4. Attempt to clear the board of all cards.

Advanced Features:
------------------

Clicking **Highlight Set** will auto-select a random Set availible on the board.

Clicking **Play 1 Round** will Automatticly Find and Claim 1 Set.

Clicking **Play All Rounds** will automaticly Claim Sets until there are no sets left to be claimed or the game is complete.