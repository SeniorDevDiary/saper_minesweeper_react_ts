import React, { useState, useEffect } from "react";
import Board from "./Board";

interface CellData {
  value: number;
  isRevealed: boolean;
  isMine: boolean;
  isFlagged: boolean;
}

const generateBoard = (
  rows: number,
  cols: number,
  mines: number
): CellData[][] => {
  const board: CellData[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      value: 0,
      isRevealed: false,
      isMine: false,
      isFlagged: false,
    }))
  );

  // Place mines
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const x = Math.floor(Math.random() * rows);
    const y = Math.floor(Math.random() * cols);
    if (!board[x][y].isMine) {
      board[x][y].isMine = true;
      minesPlaced++;
    }
  }

  // Calculate values for each cell
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j].isMine) continue;

      let minesAround = 0;
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
            minesAround++;
          }
        }
      }
      board[i][j].value = minesAround;
    }
  }

  return board;
};

const revealCell = (
  board: CellData[][],
  x: number,
  y: number
): CellData[][] => {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

  const reveal = (x: number, y: number) => {
    if (
      x < 0 ||
      x >= newBoard.length ||
      y < 0 ||
      y >= newBoard[0].length ||
      newBoard[x][y].isRevealed
    ) {
      return;
    }

    newBoard[x][y].isRevealed = true;

    if (newBoard[x][y].value === 0) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          reveal(x + dx, y + dy);
        }
      }
    }
  };

  reveal(x, y);
  return newBoard;
};

const checkWin = (board: CellData[][]): boolean => {
  return board.every((row) =>
    row.every(
      (cell) =>
        (cell.isMine && !cell.isRevealed) || (!cell.isMine && cell.isRevealed)
    )
  );
};

const Game: React.FC = () => {
  const [board, setBoard] = useState(generateBoard(10, 10, 10));
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (!gameOver && checkWin(board)) {
      setGameOver(true);
      setWon(true);
      alert("Congratulations, You Won!");
    }
  }, [board, gameOver]);

  const handleClick = (x: number, y: number) => {
    if (gameOver) return;

    const cell = board[x][y];
    if (cell.isRevealed || cell.isFlagged) return;

    if (cell.isMine) {
      setGameOver(true);
      setWon(false);
      alert("Game Over! You hit a mine.");
      return;
    }

    setBoard(revealCell(board, x, y));
  };

  const handleRightClick = (x: number, y: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (gameOver) return;

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    const cell = newBoard[x][y];

    if (!cell.isRevealed) {
      cell.isFlagged = !cell.isFlagged;
      setBoard(newBoard);
    }
  };

  const restartGame = () => {
    setBoard(generateBoard(10, 10, 10));
    setGameOver(false);
    setWon(false);
  };

  return (
    <div>
      <h1>Minesweeper</h1>
      <Board
        board={board}
        onClick={handleClick}
        onRightClick={handleRightClick}
      />
      {gameOver && (
        <div>
          <p>{won ? "You won!" : "You lost!"}</p>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default Game;
