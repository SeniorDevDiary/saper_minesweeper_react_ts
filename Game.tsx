import React, { useState } from "react";
import Board from "./Board";

const generateBoard = (rows: number, cols: number, mines: number) => {
  // Logic to generate board with mines
  let board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      value: 0,
      isRevealed: false,
      isMine: false,
      isFlagged: false,
    }))
  );

  // Place mines randomly
  let mineCount = 0;
  while (mineCount < mines) {
    const x = Math.floor(Math.random() * rows);
    const y = Math.floor(Math.random() * cols);
    if (!board[x][y].isMine) {
      board[x][y].isMine = true;
      mineCount++;
    }
  }

  // Calculate adjacent mines
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j].isMine) continue;

      let mineAround = 0;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const newRow = i + x;
          const newCol = j + y;
          if (
            newRow >= 0 &&
            newRow < rows &&
            newCol >= 0 &&
            newCol < cols &&
            board[newRow][newCol].isMine
          ) {
            mineAround++;
          }
        }
      }
      board[i][j].value = mineAround;
    }
  }

  return board;
};

const Game: React.FC = () => {
  const [board, setBoard] = useState(generateBoard(10, 10, 10));

  const handleClick = (x: number, y: number) => {
    // Logic to handle cell click
  };

  const handleRightClick = (x: number, y: number, e: React.MouseEvent) => {
    e.preventDefault();
    // Logic to handle cell right click (flagging)
  };

  return (
    <div>
      <h1>Minesweeper</h1>
      <Board
        board={board}
        onClick={handleClick}
        onRightClick={handleRightClick}
      />
    </div>
  );
};

export default Game;
