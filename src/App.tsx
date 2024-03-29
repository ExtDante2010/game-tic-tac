import { useState } from "react";
import "./App.css";
import { TURNS, WINNER_COMBI } from "./const/const";

interface ISquare {
  updateBoard?: () => void | undefined;
  index?: number;
  children?: React.ReactElement | React.ReactElement[];
  isSelected?: boolean;
  className?: string;
}
interface IUpdateboard {
  index: number;
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const [winner, setWinner] = useState(null);

  const checkWinners = (boardToCheck) => {
    for (const combo of WINNER_COMBI) {
      /// revisamos si las combinaciones selecionadas son ganadoras
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
  };

  const Square = ({ children, isSelected, index, updateBoard }: ISquare) => {
    const className = `square ${isSelected ? "is-selected" : ""}`;

    const handleClick = () => {
      updateBoard(index);
    };

    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null)), setTurn(TURNS.X), setWinner(null);
  };

  const checEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null); // logica cuando es empate
  };
  const updateBoard = (index: IUpdateboard) => {
    // no se actualiza el estado en esta posicion
    if (board[index] || winner) return;

    //Actulizacion del tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //Actualización del turno
    const newTurns = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurns);

    // revisar si hay ganador
    const newWinner = checkWinners(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
    // revisar si hay empate
    else if (checEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <>
      <main className="board">
        <h1>GAME TIC TAC TOE</h1>
        <button onClick={resetGame}>Reset Game</button>

        <section className="game">
          {board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            );
          })}
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        {winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>{winner === false ? "Empate" : "Gano"}</h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
