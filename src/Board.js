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
      // get row at given rowIndex
      var row = this.get(rowIndex);
      // create variable to store count of conflicts at given row
      var count = 0;
      // iterate over row
      for (var i= 0; i < row.length; i++) {
        // increment count by 1 for each conflict
        if (row[i] === 1) {
          count ++;
        }
      }
      // return whether count is greater than 1
      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // get number of rows on board
      var rows = this.get('n');
      // iterate over number of rows on board
      for (var i = 0; i < rows; i++) {
        // check each row if there are any row conflicts
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      // otherwise, there are no row conflicts
      return false;
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // get number of rows on board
      var rows = this.get('n');
      // create variable to store count of conflicts at given column
      var count = 0;
      // iterate over number of rows on board
      for (var i = 0; i < rows; i++) {
        // get current row
        var row = this.get(i);
        // check if current row at input colIndex has any conflicts
        if (row[colIndex] === 1) {
          count ++;
        }
      }
      // return whether count is greater than 1
      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // get number of rows on board
      var rows = this.get('n');
      // create count variable
      var count = 0;
      // iterate over number of rows on board
      for (var i = 0; i < rows; i++) {
        // check each column if there are any conflicts
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(row, col) {
      var length = this.get('n'); // set length to size of row
      var loops = length; // default loops to length
      if (col > 0) { // when checking the major diagonal col index at first row
        loops = length - col;
      }
      if (col > 0 && row > 0) {
        alert('This is not a valid input!');
      }
      var count = 0; // create variable for count of conflicts
      // iterate over loops
      for (row; row < loops; row++) {
        // get current row
        var currentRow = this.get(row);
        // check if col at current row has a conflict
        if (currentRow[col] === 1) {
          count ++; //increment count by 1
        }
        col += 1; // increment colIndex
      }
      // check whether there are more than 1 conflict
      return count > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var length = this.get('n'); // get num of rows/cols on board
      // iterate over length
      for (var i = 0; i < length; i++) {
        if (this.hasMajorDiagonalConflictAt(0, i) || this.hasMajorDiagonalConflictAt(i, 0)) {
          return true;
        }
      }
      return false;
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(row, col) {
      var length = this.get('n'); // set length to size of row
      var loops = length; // default loops to length
      if (row === 0) { // when checking the minor diagonal column index at first row
        loops = col + 1;
      }
      if (col < length && row > 0) {
        alert('This is not a valid input!');
      }
      var count = 0; // create variable for count of conflicts
      // iterate over loops
      for (row; row < loops; row++) {
        // get current row
        var currentRow = this.get(row);
        // check if col at current row has a conflict
        if (currentRow[col] === 1) {
          count ++; //increment count by 1
        }
        col -= 1; // decrement colIndex
      }
      // check whether there are more than 1 conflict
      return count > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
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
