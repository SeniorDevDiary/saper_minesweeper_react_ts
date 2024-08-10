import React from "react";
import Cell from "./Cell";

interface CellData {
  value: number;
  isRevealed: boolean;
  isMine: boolean;
  isFlagged: boolean;
}

interface BoardProps {
  board: CellData[][];
  onClick: (x: number, y: number) => void;
  onRightClick: (x: number, y: number, e: React.MouseEvent) => void;
}

const Board: React.FC<BoardProps> = ({ board, onClick, onRightClick }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${board[0].length}, 40px)`,
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell.value}
            isRevealed={cell.isRevealed}
            isMine={cell.isMine}
            isFlagged={cell.isFlagged}
            onClick={() => onClick(rowIndex, colIndex)}
            onRightClick={(e) => onRightClick(rowIndex, colIndex, e)}
          />
        ))
      )}
    </div>
  );
};

export default Board;
