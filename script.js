"use strict";

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

  const reset = () => {
    board = new Array(9);
  }

  return { setField, getField, reset };
})();

const Player = (sign) => {
  this.sign = sign;

  const getSign = () => {
    return sign;
  }

  return { getSign };
};

const displayController = (() => {
  const fields = document.querySelectorAll('.field');
  const message = document.querySelector('.message');
  const reset = document.querySelector('.reset');

  fields.forEach((field) =>
    field.addEventListener('click', (e) => {
      if (gameController.getIsOver() || e.target.textContent !== "") return;
      gameController.playRound(e.target.dataset.index);
      updateGameBoard();
    })
  );

  reset.addEventListener('click', (e) => {
    gameBoard.reset();
    gameController.reset();
    updateGameBoard();
    setMsg("Player O's turn");
  })

  const updateGameBoard = () => {
    for (let i = 0; i < fields.length; i++) {
      fields[i].textContent = gameBoard.getField(i);
    }
  }

  const setResultMessage = (winner) => {
    if (winner === "Draw") {
      setMsg("It's a draw!");
    } else {
      setMsg(`Player ${winner} has won!`);
    }
  };

  const setMsg = (msg) => {
    message.textContent = msg;
  }

  return { setResultMessage, setMsg };
})();

const gameController = (() => {
  let playerO = Player("O");
  let playerX = Player("X");
  let round = 1;
  let gameOver = false;

  const playRound = (inputIndex) => {
    gameBoard.setField(inputIndex, getCurrentPlayerSign());
    // checkWinner(inputIndex);
    if (checkWinner(inputIndex)) {
      displayController.setResultMessage(getCurrentPlayerSign());
      gameOver = true;
      return;
    }
    if (round === 9) {
      displayController.setResultMessage("Draw");
      gameOver = true;
      return;
    }
    round++;
    displayController.setMsg(
      `Player ${getCurrentPlayerSign()}'s turn`
    );
  };

  const getCurrentPlayerSign = () => {
    return round % 2 === 1 ? playerO.getSign() : playerX.getSign();
  }

  const checkWinner = (fieldIndex) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let over = false;
    winConditions.forEach(e => {
      if (gameBoard.getField(e[0]) === getCurrentPlayerSign() &&
        gameBoard.getField(e[1]) === getCurrentPlayerSign() &&
        gameBoard.getField(e[2]) === getCurrentPlayerSign()) {
        over = true;
      }
    })
    return over;
  };

  const getIsOver = () => {
    return gameOver;
  }

  const reset = () => {
    round = 1;
    gameOver = false;
  }

  return { playRound, getIsOver, reset };
})();
