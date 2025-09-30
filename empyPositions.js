//funcion que devuelve un array con los indices de las posiciones vacias, mediante el metodo reduce
export default function emptyPositions(board) {
  return board.reduce((acc, value, index) => {
    if (value === 0) acc.push(index);
    return acc;
  }, []);
}
