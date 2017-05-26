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
  var size = n;
  var newBoard = new Board({'n': size});

  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      newBoard.togglePiece(row, col); // placing rook
      if (newBoard.hasAnyRooksConflicts()) { // if conflict
        newBoard.togglePiece(row, col);  // toggle rook off
      }  
    }  
  }

  var solution = newBoard.rows(); 

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var count = 0;
  var size = n;
  var newBoard = new Board({'n': size});
  
    
  // we put one down at 0/0
  // we elimitate all row selections/
  // we put down on 1/0
  // we check if colum conflict
  // if it is , move to next



  // var checkBoards = function(board, n) {
  //   for (var row = 0; row < n; row++) {
  //     for (var col = 0; col < n; col++) {
  //       newBoard.togglePiece(row, col); // placing rook
  //       if (newBoard.hasAnyRooksConflicts()) { // if conflict
  //         newBoard.togglePiece(row, col);  // toggle rook off
  //       }
  //     }  
  //   }
  //   return checkBoards();
  // };
  
  // first viable solution with 3 rooks (n === 3)
    // [1, 0, 0]
    // [0, 1, 0]
    // [0, 0, 1]

  // hold rook position in row 1 constant
  // change row 2 position by 1
  // iterate through row 3
    // [1, 0, 0]
    // [0, 0, 1]
    // [1, 0, 0] =>
              // [1, 0, 0]
              // [0, 0, 1] 
              // [0, 1, 0] => 
                              // [1, 0, 0]
                              // [0, 0, 1]
                              // [0, 0, 1]

  // change rook position in row 1 to [0, 1, 0]
      // [0, 1, 0]
      // [1, 0, 0]
      // [1, 0, 0] => 
                    // [0, 1, 0]
                    // [1, 0, 0]
                    // [0, 1, 0] =>
                                    // [0, 1, 0]
                                    // [1, 0, 0]  
                                    // [0, 0, 1] =>
                                                    // [0, 1, 0]
                                                    // [0, 1, 0]
                                                    // [1, 0, 0]
  checkBoards(newBoard, size);

  var solutionCount = count; 
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // var size = n;
  // var newBoard = new Board({'n': size});
  // // var rookOne = newBoard.togglePiece(0, 0); 

  // for (var row = 0; row < n; row++) {
  //   for (var col = 0; col < n; col++) {
  //     newBoard.togglePiece(row, col); // placing rook
  //     if (newBoard.hasAnyQueenConflictsOn()) { // if conflict
  //       newBoard.togglePiece(row, col);  // toggle rook off
  //     }  
  //   }  
  // }

  var solution = newBoard.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};