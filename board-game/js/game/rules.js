import { ROWS, COLS } from "./state.js"

export function getLegalMoves(
  fromRow,
  fromCol,
  board
) {

  const moves = []

  for (
    let row = 0;
    row < ROWS;
    row++
  ) {

    for (
      let col = 0;
      col < COLS;
      col++
    ) {

      if (
        isMoveLegal(
          fromRow,
          fromCol,
          row,
          col,
          board
        )
      ) {

        moves.push({
          row,
          col,
        })
      }
    }
  }

  return moves
}

export function isMoveLegal(
  fromRow,
  fromCol,
  toRow,
  toCol,
  currentBoard
) {

  if (
    !isInsideBoard(
      toRow,
      toCol
    )
  ) {
    return false
  }

  if (
    fromRow === toRow &&
    fromCol === toCol
  ) {
    return false
  }

  const piece =
    currentBoard[
      fromRow
    ][
      fromCol
    ]

  if (!piece) {
    return false
  }

  const target =
    currentBoard[
      toRow
    ][
      toCol
    ]

  /*
    Không ăn quân mình
  */

  if (
    target &&
    target.side ===
      piece.side
  ) {
    return false
  }

  /*
    Luật đi của quân
  */

  if (
    !isBasicMoveAllowed(
      piece,
      fromRow,
      fromCol,
      toRow,
      toCol,
      currentBoard
    )
  ) {
    return false
  }

  /*
    Giả lập nước đi
  */

  const simulatedBoard =
    cloneBoard(
      currentBoard
    )

  simulatedBoard[
    toRow
  ][
    toCol
  ] =
    simulatedBoard[
      fromRow
    ][
      fromCol
    ]

  simulatedBoard[
    fromRow
  ][
    fromCol
  ] = null

  /*
    Không được tự làm
    Tướng mình bị chiếu
  */

  if (
    isInCheck(
      piece.side,
      simulatedBoard
    )
  ) {
    return false
  }

  return true
}

export function isBasicMoveAllowed(
  piece,
  fromRow,
  fromCol,
  toRow,
  toCol,
  currentBoard
) {

  switch (
    piece.type
  ) {

    case "rook":

      return canRookMove(
        fromRow,
        fromCol,
        toRow,
        toCol,
        currentBoard
      )

    case "horse":

      return canHorseMove(
        fromRow,
        fromCol,
        toRow,
        toCol,
        currentBoard
      )

    case "elephant":

      return canElephantMove(
        piece,
        fromRow,
        fromCol,
        toRow,
        toCol,
        currentBoard
      )

    case "advisor":

      return canAdvisorMove(
        piece,
        fromRow,
        fromCol,
        toRow,
        toCol
      )

    case "general":

      return canGeneralMove(
        piece,
        fromRow,
        fromCol,
        toRow,
        toCol,
        currentBoard
      )

    case "cannon":

      return canCannonMove(
        fromRow,
        fromCol,
        toRow,
        toCol,
        currentBoard
      )

    case "soldier":

      return canSoldierMove(
        piece,
        fromRow,
        fromCol,
        toRow,
        toCol
      )

    default:

      return false
  }
}

export function canRookMove(
  fromRow,
  fromCol,
  toRow,
  toCol,
  currentBoard
) {

  if (
    fromRow !== toRow &&
    fromCol !== toCol
  ) {
    return false
  }

  return (
    countPiecesBetween(
      fromRow,
      fromCol,
      toRow,
      toCol,
      currentBoard
    ) === 0
  )
}

export function canHorseMove(
  fromRow,
  fromCol,
  toRow,
  toCol,
  currentBoard
) {

  const rowDiff =
    toRow - fromRow

  const colDiff =
    toCol - fromCol

  const absRow =
    Math.abs(rowDiff)

  const absCol =
    Math.abs(colDiff)

  const isHorseShape =
    (
      absRow === 2 &&
      absCol === 1
    ) ||
    (
      absRow === 1 &&
      absCol === 2
    )

  if (!isHorseShape) {
    return false
  }

  let blockRow =
    fromRow

  let blockCol =
    fromCol

  /*
    Đi 2 theo chiều dọc
  */

  if (absRow === 2) {

    blockRow =
      fromRow +
      Math.sign(rowDiff)

  } else {

    /*
      Đi 2 theo chiều ngang
    */

    blockCol =
      fromCol +
      Math.sign(colDiff)
  }

  /*
    Chặn chân Mã
  */

  if (
    currentBoard[
      blockRow
    ][
      blockCol
    ]
  ) {
    return false
  }

  return true
}

export function canElephantMove(
  piece,
  fromRow,
  fromCol,
  toRow,
  toCol,
  currentBoard
) {

  const rowDiff =
    Math.abs(
      toRow - fromRow
    )

  const colDiff =
    Math.abs(
      toCol - fromCol
    )

  /*
    Tượng đi chéo 2 ô
  */

  if (
    rowDiff !== 2 ||
    colDiff !== 2
  ) {
    return false
  }

  /*
    Tượng Đỏ không qua sông
  */

  if (
    piece.side === "red" &&
    toRow < 5
  ) {
    return false
  }

  /*
    Tượng Đen không qua sông
  */

  if (
    piece.side === "black" &&
    toRow > 4
  ) {
    return false
  }

  /*
    Mắt Tượng
  */

  const middleRow =
    (fromRow + toRow) / 2

  const middleCol =
    (fromCol + toCol) / 2

  if (
    currentBoard[
      middleRow
    ][
      middleCol
    ]
  ) {
    return false
  }

  return true
}

export function canAdvisorMove(
  piece,
  fromRow,
  fromCol,
  toRow,
  toCol
) {

  if (
    !isInsidePalace(
      piece.side,
      toRow,
      toCol
    )
  ) {
    return false
  }

  const rowDiff =
    Math.abs(
      toRow - fromRow
    )

  const colDiff =
    Math.abs(
      toCol - fromCol
    )

  return (
    rowDiff === 1 &&
    colDiff === 1
  )
}

export function canGeneralMove(
  piece,
  fromRow,
  fromCol,
  toRow,
  toCol,
  currentBoard
) {

  const target =
    currentBoard[
      toRow
    ][
      toCol
    ]

  /*
    Phi Tướng

    Hai Tướng cùng cột
    và không có quân ở giữa.
  */

  if (
    target &&
    target.type === "general" &&
    target.side !== piece.side &&
    fromCol === toCol
  ) {

    return (
      countPiecesBetween(
        fromRow,
        fromCol,
        toRow,
        toCol,
        currentBoard
      ) === 0
    )
  }

  /*
    Tướng không ra khỏi cung
  */

  if (
    !isInsidePalace(
      piece.side,
      toRow,
      toCol
    )
  ) {
    return false
  }

  const rowDiff =
    Math.abs(
      toRow - fromRow
    )

  const colDiff =
    Math.abs(
      toCol - fromCol
    )

  /*
    Chỉ đi ngang/dọc 1 bước
  */

  return (
    rowDiff + colDiff === 1
  )
}

export function canCannonMove(
  fromRow,
  fromCol,
  toRow,
  toCol,
  currentBoard
) {

  if (
    fromRow !== toRow &&
    fromCol !== toCol
  ) {
    return false
  }

  const count =
    countPiecesBetween(
      fromRow,
      fromCol,
      toRow,
      toCol,
      currentBoard
    )

  const target =
    currentBoard[
      toRow
    ][
      toCol
    ]

  /*
    Pháo đi bình thường
    không được có quân cản.
  */

  if (!target) {

    return count === 0
  }

  /*
    Pháo ăn quân
    phải có đúng 1 ngòi.
  */

  return count === 1
}

export function canSoldierMove(
  piece,
  fromRow,
  fromCol,
  toRow,
  toCol
) {

  const rowDiff =
    toRow - fromRow

  const colDiff =
    toCol - fromCol

  /*
    RED
  */

  if (
    piece.side === "red"
  ) {

    /*
      Đi lên 1 bước
    */

    if (
      rowDiff === -1 &&
      colDiff === 0
    ) {
      return true
    }

    /*
      Qua sông:
      được đi ngang.
    */

    const crossedRiver =
      fromRow <= 4

    if (
      crossedRiver &&
      rowDiff === 0 &&
      Math.abs(colDiff) === 1
    ) {
      return true
    }

    return false
  }

  /*
    BLACK
  */

  if (
    rowDiff === 1 &&
    colDiff === 0
  ) {
    return true
  }

  const crossedRiver =
    fromRow >= 5

  if (
    crossedRiver &&
    rowDiff === 0 &&
    Math.abs(colDiff) === 1
  ) {
    return true
  }

  return false
}

export function isInsidePalace(
  side,
  row,
  col
) {

  if (
    col < 3 ||
    col > 5
  ) {
    return false
  }

  /*
    Cung Đen
  */

  if (
    side === "black"
  ) {

    return (
      row >= 0 &&
      row <= 2
    )
  }

  /*
    Cung Đỏ
  */

  return (
    row >= 7 &&
    row <= 9
  )
}

export function countPiecesBetween(
  fromRow,
  fromCol,
  toRow,
  toCol,
  currentBoard
) {

  let count = 0

  /*
    Cùng hàng
  */

  if (
    fromRow === toRow
  ) {

    const start =
      Math.min(
        fromCol,
        toCol
      ) + 1

    const end =
      Math.max(
        fromCol,
        toCol
      )

    for (
      let col = start;
      col < end;
      col++
    ) {

      if (
        currentBoard[
          fromRow
        ][
          col
        ]
      ) {
        count++
      }
    }

    return count
  }

  /*
    Cùng cột
  */

  if (
    fromCol === toCol
  ) {

    const start =
      Math.min(
        fromRow,
        toRow
      ) + 1

    const end =
      Math.max(
        fromRow,
        toRow
      )

    for (
      let row = start;
      row < end;
      row++
    ) {

      if (
        currentBoard[
          row
        ][
          fromCol
        ]
      ) {
        count++
      }
    }
  }

  return count
}

export function isInCheck(
  side,
  currentBoard
) {

  const generalPosition =
    findGeneral(
      side,
      currentBoard
    )

  if (!generalPosition) {
    return true
  }

  const enemySide =
    side === "red"
      ? "black"
      : "red"

  for (
    let row = 0;
    row < ROWS;
    row++
  ) {

    for (
      let col = 0;
      col < COLS;
      col++
    ) {

      const piece =
        currentBoard[
          row
        ][
          col
        ]

      if (
        !piece ||
        piece.side !== enemySide
      ) {
        continue
      }

      if (
        canPieceAttack(
          piece,
          row,
          col,
          generalPosition.row,
          generalPosition.col,
          currentBoard
        )
      ) {

        return true
      }
    }
  }

  return false
}

export function canPieceAttack(
  piece,
  fromRow,
  fromCol,
  toRow,
  toCol,
  currentBoard
) {

  return isBasicMoveAllowed(
    piece,
    fromRow,
    fromCol,
    toRow,
    toCol,
    currentBoard
  )
}

export function findGeneral(
  side,
  currentBoard
) {

  for (
    let row = 0;
    row < ROWS;
    row++
  ) {

    for (
      let col = 0;
      col < COLS;
      col++
    ) {

      const piece =
        currentBoard[
          row
        ][
          col
        ]

      if (
        piece &&
        piece.side === side &&
        piece.type === "general"
      ) {

        return {
          row,
          col,
        }
      }
    }
  }

  return null
}

export function hasAnyLegalMove(
  side,
  board
) {

  for (
    let fromRow = 0;
    fromRow < ROWS;
    fromRow++
  ) {

    for (
      let fromCol = 0;
      fromCol < COLS;
      fromCol++
    ) {

      const piece =
        board[
          fromRow
        ][
          fromCol
        ]

      if (
        !piece ||
        piece.side !== side
      ) {
        continue
      }

      for (
        let toRow = 0;
        toRow < ROWS;
        toRow++
      ) {

        for (
          let toCol = 0;
          toCol < COLS;
          toCol++
        ) {

          if (
            isMoveLegal(
              fromRow,
              fromCol,
              toRow,
              toCol,
              board
            )
          ) {
            return true
          }
        }
      }
    }
  }

  return false
}

export function cloneBoard(
  currentBoard
) {

  return currentBoard.map(
    row => {

      return row.map(
        piece => {

          if (!piece) {
            return null
          }

          return {
            ...piece,
          }
        }
      )
    }
  )
}

export function isInsideBoard(
  row,
  col
) {

  return (
    row >= 0 &&
    row < ROWS &&
    col >= 0 &&
    col < COLS
  )
}
