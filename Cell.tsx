import React from "react";

interface CellProps {
  value: string | number;
  isRevealed: boolean;
  isMine: boolean;
  isFlagged: boolean;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}

const Cell: React.FC<CellProps> = ({
  value,
  isRevealed,
  isMine,
  isFlagged,
  onClick,
  onRightClick,
}) => {
  let content = "";

  if (isRevealed) {
    content = isMine ? "💣" : value.toString();
  } else if (isFlagged) {
    content = "🚩";
  }

  return (
    <div
      onClick={onClick}
      onContextMenu={onRightClick}
      className={`cell ${isRevealed ? "revealed" : ""}`}
      style={{
        width: "40px",
        height: "40px",
        border: "1px solid black",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: isRevealed ? "#ddd" : "#bbb",
      }}
    >
      {content}
    </div>
  );
};

export default Cell;
