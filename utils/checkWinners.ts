import { WINNER_COMBI } from "../src/const/const";

export const checkWinners = (boardToCheck: number[]) => {
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
