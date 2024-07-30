document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.getElementById("restartButton");
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];

    const checkWinner = (board, player) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winConditions.some(condition => 
            condition.every(index => board[index] === player)
        );
    };

    const isBoardFull = (board) => {
        return board.every(cell => cell !== "");
    };

    const handleClick = (e) => {
        const cell = e.target;
        const index = cell.getAttribute("data-index");

        if (board[index] !== "") return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner(board, currentPlayer)) {
            setTimeout(() => alert(`Player ${currentPlayer} wins!`), 100);
            return;
        }

        if (isBoardFull(board)) {
            setTimeout(() => alert("The game is a draw!"), 100);
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
    };

    const restartGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => (cell.textContent = ""));
        currentPlayer = "X";
    };

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    restartButton.addEventListener("click", restartGame);
});
