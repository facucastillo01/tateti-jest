//Funcion que verifica si el tablero es correcto, en longitud, como con los valores que contiene, retorna un booleano

export default function boardIsCorrect(board) {
  if (!Array.isArray(board) || board.length !== 9) {
    return false;
  }

  for (let value of board) {
    if (![0, 1, 2].includes(value)) {
      return false;
    }
  }
  return true;
}
