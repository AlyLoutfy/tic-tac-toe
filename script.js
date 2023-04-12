const gameBoard = (() => {
  let board = new Array(9);

  const setField = (index, sign) => {
    if (index > board.length) return;
    board[index] = sign;
  }

  const getField = (index) => {
    if (index > board.length) return;
    return board[index];
  }

  return { setField, getField };
});

const Player = (sign) => {
  this.sign = sign;

  const getSign = () => {
    return sign;
  }

  return { getSign };
};