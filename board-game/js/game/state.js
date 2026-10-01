export const CELL_SIZE = 64
export const PADDING_X = 38
export const PADDING_Y = 38
export const ROWS = 10
export const COLS = 9
export const INITIAL_TIME = 10 * 60 * 1000

export const state = {
  board: [], currentTurn: "red", selectedPosition: null, gameOver: false,
  activeMoveAnimation: null, isAnimating: false, animationVersion: 0,
  remainingTime: { red: INITIAL_TIME, black: INITIAL_TIME },
  clockStarted: false, lastClockUpdate: performance.now(),
  ringSide: null, turnElapsed: 0, localPlayerName: "Picolozz",
}

export function createPiece(
  type,
  side,
  name
) {
  return {
    type,
    side,
    name,
  }
}

export function createInitialBoard() {

  const newBoard =
    Array.from(
      { length: ROWS },
      () => Array(COLS).fill(null)
    )

  /* =====================
     BLACK
  ===================== */

  newBoard[0] = [
    createPiece("rook", "black", "車"),
    createPiece("horse", "black", "馬"),
    createPiece("elephant", "black", "象"),
    createPiece("advisor", "black", "士"),
    createPiece("general", "black", "將"),
    createPiece("advisor", "black", "士"),
    createPiece("elephant", "black", "象"),
    createPiece("horse", "black", "馬"),
    createPiece("rook", "black", "車"),
  ]

  newBoard[2][1] =
    createPiece(
      "cannon",
      "black",
      "炮"
    )

  newBoard[2][7] =
    createPiece(
      "cannon",
      "black",
      "炮"
    )

  for (
    let col = 0;
    col < COLS;
    col += 2
  ) {

    newBoard[3][col] =
      createPiece(
        "soldier",
        "black",
        "卒"
      )
  }

  /* =====================
     RED
  ===================== */

  newBoard[9] = [
    createPiece("rook", "red", "車"),
    createPiece("horse", "red", "馬"),
    createPiece("elephant", "red", "相"),
    createPiece("advisor", "red", "仕"),
    createPiece("general", "red", "帥"),
    createPiece("advisor", "red", "仕"),
    createPiece("elephant", "red", "相"),
    createPiece("horse", "red", "馬"),
    createPiece("rook", "red", "車"),
  ]

  newBoard[7][1] =
    createPiece(
      "cannon",
      "red",
      "炮"
    )

  newBoard[7][7] =
    createPiece(
      "cannon",
      "red",
      "炮"
    )

  for (
    let col = 0;
    col < COLS;
    col += 2
  ) {

    newBoard[6][col] =
      createPiece(
        "soldier",
        "red",
        "兵"
      )
  }

  return newBoard
}
