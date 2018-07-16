const PrefixTree = require('trie-prefix-tree');
const dictionary = require('../lib/dictionary');
const prefixTree = PrefixTree(dictionary);

//
// Adj table is for relative indexes around a board position
//
const adjTable = [
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
]

//
// Recursive boggle board solver
// Given a board, current x,y, and a currentPrefix recursively traverse the 
// board, looking for valid words in the dictionary.
// If prefix is not in the dictionay, abort this path and pop up to 
// try the next adjacent board position.
//
// Ensure a board position is only used once in a path by marking any used positions
// with an empty char. Restor the path as we pop out of the recursion
// 
function solve(words, board, x, y, currentPrefix) {
    // If x,y is a valid board position (meaning on the board and contains a character)
    if (board[x] && board[x][y]) {
        // Add the current letter to our running prefix
        let letter = board[x][y]
        let newPrefix = currentPrefix + letter;

        // If the prefix is a word in our dictionay, add the word to our list of words
        if (prefixTree.hasWord(newPrefix)) {
            words[newPrefix] = true;
        }

        // Mark this board position as havning been used in this path
        board[x][y] = '';

        // If the new prefix is a valid prefix in our dictionay
        // Perform a recursive search on the board for each
        // adjacent board position
        if (prefixTree.isPrefix(newPrefix)) {
            adjTable.forEach(adj => {
                // Use the adjTable as the index offset from the current
                // board positon
                solve(words, board, x + adj.x, y + adj.y, newPrefix);
            })
        }
        board[x][y] = letter;
    }
}


function boggleWords(board) {
    let words = {};
    board.forEach((row, i) => {
        row.forEach((cell, j) => {
            solve(words, board, i, j, '');
        });
    })
    return Object.keys(words).sort()
}

module.exports = boggleWords;