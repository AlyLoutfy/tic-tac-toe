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
})();

const Player = (sign) => {
  this.sign = sign;

  const getSign = () => {
    return sign;
  }

  return { getSign };
};

const displayController = (() => {
  let fields = document.querySelectorAll('.field');

  fields.forEach((field) =>
    field.addEventListener('click', (e) => {
      if (gameController.getIsOver() || e.target.textContent !== "") return;
      gameController.playRound(e.target.dataset.index);
      updateGameBoard();
    })
  );

  const updateGameBoard = () => {
    for (let i = 0; i < fields.length; i++) {
      fields[i].textContent = gameBoard.getField(i);
    }
  }

  return { updateGameBoard };
})();

const gameController = (() => {
  let playerO = Player("O");
  let playerX = Player("X");
  let round = 1;
  let gameOver = false;

  const playRound = (inputIndex) => {
    gameBoard.setField(inputIndex, getCurrentPlayerSign());
    round++;
  }

  const getCurrentPlayerSign = () => {
    return round % 2 === 1 ? playerO.getSign() : playerX.getSign();
  }

  const getIsOver = () => {
    return gameOver;
  }

  const reset = () => {
    round = 1;
    gameOver = false;
  }

  return { playRound, getIsOver, reset };
})();
