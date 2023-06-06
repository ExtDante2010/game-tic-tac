import { useState } from "react";
import { TURNS } from "../src/const/const";
import { checkWinners } from "./checkWinners";

export const updateBoard = (index) => {
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);
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
