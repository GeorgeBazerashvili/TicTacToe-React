import React, { useEffect, useState } from "react";

function Board() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [result, setResult] = useState(null);

  function checkWinner(newBoard, currentPlayer) {
    let draw = true;
    for (const winning of winConditions) {
      const [a, b, c] = winning;
      if (
        newBoard[a] == currentPlayer &&
        newBoard[b] == currentPlayer &&
        newBoard[c] == currentPlayer
      ) {
        setResult(`${currentPlayer} wins!`);
      }
    }

    for (const cell of newBoard) {
      if (cell == null) {
        draw = false;
        break;
      }
    }

    if (draw) {
      setResult("draw!");
    }
  }

  function handleClick(index) {
    if (board[index] === null) {
      let newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
    }
  }

  useEffect(() => {
    checkWinner(board, player);
    setPlayer((prev) => (prev == "X" ? (prev = "O") : (prev = "X")));
  }, [board]);

  return (
    <>
      <div className="result">{result}</div>
      <section className="board">
        {board.map((value, index) => {
          return (
            <div key={index} onClick={() => handleClick(index)}>
              {value}
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Board;
