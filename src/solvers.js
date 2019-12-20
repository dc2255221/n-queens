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

let test = 0;

window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var level = 0;
  test += 1;
  var recurse = function() {
    // iterate over length of each level. one loop for each level
    for (var i = 0; i < n; i++) {
      // toogle piece onto the level row and i col
      board.togglePiece(level, i);
      // if there is conflicts at this index
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(level, i); // toggle off piece
      } else { // if there is no conflicts at index
        if (level === n - 1) { // if level is at the end
          let tempSolution = Object.values(board.attributes).slice(0, Object.values(board.attributes).length - 1);
          console.log('Single solution for ' + n + ' rooks:', JSON.stringify(tempSolution));
          return tempSolution;
        } else { // otherwise, recurse down and add 1 to level
          level ++;
          return recurse(); // call recurse again until it finds solution or i = n
        }
      }
    }
    level --; //decrement level at end of for loop.
  };
  var solution = recurse();
  if (solution !== undefined) {
    return solution;
  }
  return null; // end of board and no solution found
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  var level = 0;
  test += 1;
  var recurse = function() {
    // iterate over length of each level. one loop for each level
    for (var i = 0; i < n; i++) {
      // toogle piece onto the level row and i col
      board.togglePiece(level, i);
      // if there is conflicts at this index
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(level, i); // toggle off piece
      } else { // if there is no conflicts at index
        if (level === n - 1) { // if level is at the end
          solutionCount += 1;
          // toggle off piece at current level
          board.togglePiece(level, i);
          // decrement level
          level --;
          if (level > 0) {
            // toggle off previous level rook
            var row = board.get(level);
            for (var i = 0; i < n; i++) {
              if (board.attributes[i] === 1) {
                board.togglePiece(level, i);
              }
            }
          }
          break;
        } else { // otherwise, recurse down and add 1 to level
          level ++;
          return recurse(); // call recurse again until it finds solution or i = n
        }
      }
    }
    level --; //decrement level at end of for loop.
  };
  recurse();
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
