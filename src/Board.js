// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var rowSum = row.reduce((a, b) => a + b);
      return rowSum > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var table = this.attributes;
      for (let i = 0; i < this.get('n'); i++) {
        // check every row on the board
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var table = this.attributes;
      var cnt = 0;
      // for each row's colIndex, 
      for (let i = 0; i < this.get('n'); i++) {
        // check if it is 1 (table[0][1], table[1][1], table[2][1], table[3][1])
        if (table[i][colIndex]) {
          // if it is, return true
          cnt++;
        }
      }
      // else return false
      return cnt > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var table = this.attributes;
      for (let i = 0; i < this.get('n'); i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var place = majorDiagonalColumnIndexAtFirstRow;
      var table = this.attributes;

      var cnt = 0;
      var colIndex = 0;
      for (let i = place; i <= this.get('n') - place; i++) {
        if (table[i][colIndex] === 1) {
          res++;
        }
        cnt++;
      }
      return res > 1;
    },


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // col - row input -3: no iteration
      // col - row input -2: iterate [2][0], [3][1]
      // col - row input -1: iterate [1][0], [2][1], [3][2]
      // col - row input  0: iterate [0][0], [1][1], [2][2], [3][3]
      // col - row input  1: iterate [0][1], [1][2], [2][3]
      // col - row input  2: iterate [0][2], [1][3]
      // col - row input  3: no iteration

      var table = this.attributes;
      var results = {};

      for (let row = 0; row < this.get('n'); row++) {
        for (let col = 0; col < this.get('n'); col++) {
          var locator = this._getFirstRowColumnIndexForMajorDiagonalOn(row, col);
          if (!results[locator]) {
            results[locator] = table[row][col];
          } else {
            results[locator] += table[row][col];
          }
        }
      }
      for (var key in results) {
        if (results[key] > 1) {
          return true;
        }
      }
      return false;
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
    
      var place = minorDiagonalColumnIndexAtFirstRow;
      var table = this.attributes;

      var cnt = 0;
      var rowIndex = 0;
      for (let i = place; i <= this.get('n') - place; i++) {
        if (table[rowIndex][i] === 1) {
          res++;
        }
        cnt++;
      }
      return res > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      //   return colIndex + rowIndex;
      // },

      // col + row input  6: no iteration
      // col + row input  5: iterate [3][2], [2][3]
      // col + row input  4: iterate [1][3], [2][2], [3][1]
      // col + row input  3: iterate [0][3], [1][2], [2][1], [3][0]
      // col + row input  2: iterate [0][2], [1][1], [2][0]
      // col + row input  1: iterate [0][1], [1][0]
      // col + row input  0: no iteration

      var table = this.attributes;
      var results = {};

      for (let row = 0; row < this.get('n'); row++) {
        for (let col = 0; col < this.get('n'); col++) {
          var locator = this._getFirstRowColumnIndexForMinorDiagonalOn(row, col);
          if (!results[locator]) {
            results[locator] = table[row][col];
          } else {
            results[locator] += table[row][col];
          }
        }
      }
      for (var key in results) {
        if (results[key] > 1) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
