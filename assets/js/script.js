document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll("[data-cell]");
    const message = document.getElementById("message");
    const restartButton = document.getElementById("restart");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWinner = () => {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                highlightWinningCells(pattern);
                message.textContent = `${gameBoard[a]} wins!`;
                return;
            }
        }
    
        if (!gameBoard.includes("") && gameActive) {
            gameActive = false;
            message.textContent = "It's a draw!";
        }
    };
    

    const highlightWinningCells = (pattern) => {
        for (const index of pattern) {
            cells[index].style.backgroundColor = "#4CAF50";
        }
    };

    const handleClick = (cell, index) => {
        if (gameBoard[index] === "" && gameActive) {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            checkWinner();
        }
    };
    const restartGame = () => {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        message.textContent = "";
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("X", "O");
            cell.style.backgroundColor = "";
        });
        currentPlayer = "X";
    };

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleClick(cell, index));
    });

    restartButton.addEventListener("click", restartGame);
});

