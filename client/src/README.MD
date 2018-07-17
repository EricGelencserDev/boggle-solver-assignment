# Boggle Board Solver

This application demonstrates a simple boggle board solving application.

The code is implemented in to two parts.  

The server is implementd in node.js using express for api routing.

The client is implemented in react and is a single page web application which handles user input and board rendering.

When a user has entered a board configuration and clicks on the "solve" button, the client POSTS the board (as two dimensional array) to the '/board' API endpoint.

The server solves the board by employing a recursive search algorithm for each square on the board.  

The dictionary being used was downloaded from:

https://github.com/benjamincrom/scrabble/blob/master/scrabble/dictionary.json

It is a flat array of words.

In order to optimize the prefix searching for the boggle solution, the server converts the flat array of words into a "prefix tree".  An publically available npm module is used to implement the prefix tree.

https://www.npmjs.com/package/trie-prefix-tree

No third party modules were used to implement the board search algorithm.

The board search algorthim performs a recursive depth first search of the board for each square on the board.  The algorithm marks visited squares as it is traversing the paths for each square, to avoid re-using a previously visited square.


To test this app locally, clone this repo.  In the top level directory, type `npm install` to install the node modules.  This server was implemented using node version 8.x. It has not been tested with lower versions.

The react production react client is served from the ./client/build directory.  All client source code is provided.
