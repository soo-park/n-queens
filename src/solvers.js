/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function(n) {

  var arrBoard = [];

  var boardToggle = function() {

    if (arrBoard.length === 0) {
      for (let i = 0; i < n; i++) {
        var row = [];
        for (let j = 0; j < n; j++) {
          row.push[0];
        }
        arrBoard.push(row);
      }
    }

    // set up a counter for a board
    var cnt = 0;

    var toggle = function(arrBoard) {
      // if there are less than n pieces, turn one on
      if (cnt < n) {
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            arrBoard[i][j] = 1;
            arrBoard = arrBoard[i][j];
          }
        }      
      }
      cnt++;
      return toggle(arrBoard);
    };

    arrBoard = toggle(arrBoard);
    arrBoardObj = new Board(arrBoard);

    if (!arrBoardObj.hasAnyColConflicts() && !arrBoardObj.hasAnyRowConflicts()) {
      solution = arrBoard;
      return solution;
    }
  };

  var solution = undefined; // fix me

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};