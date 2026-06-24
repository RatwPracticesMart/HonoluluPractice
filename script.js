// ============================
// ELEMENTS
// ============================

const mainMenu = document.getElementById("mainMenu");
const wordSearchScreen = document.getElementById("wordSearchScreen");

const wordSearchBtn = document.getElementById("wordSearchBtn");
const backBtn = document.getElementById("backBtn");

const wordFlash = document.getElementById("wordFlash");

const boardContainer = document.getElementById("boardContainer");
const board = document.getElementById("board");

let selectedLetters = [];

let startTime = 0;
let timerInterval = null;

// ============================
// TEST WORD
// ============================

const WORDS = [
"WIKIWIKI",
"MAHALO",
"WAWAE",
"MO'O",
"AUMAKUA",
"PAPA",
"ALI'I",
"PANIOLO",
"KAPA",
"WEHE",
"AKUA",
"NANEA",
"PILIKIA",
"PEKONA",
"HEIAU",
"AKAMAI",
"LAULIMA",
"NANAHU",
"HONU",
"WAENA",
"MANU",
"LANI",
"HELE",
"PALAI",
"POPOKI",
"PAHOEHOE",
"NA'AU",
"HOLA",
"PAHUAHUA",
"MOANA",
"KANIKAPILA",
"'A'OLE",
"ALOHA",
"NANAU",
"KEIKI",
"KAHU",
"HULIHULI",
"WAELE",
"KUPUNA",
"NA'AHELU",
"OHANA",
"PUPU"
];

let currentWord = "";
let currentRound = 0;
const TOTAL_ROUNDS = 5;

// ============================
// START WORD SEARCH
// ============================

wordSearchBtn.addEventListener("click", startWordSearch);

function startWordSearch() {

    mainMenu.classList.add("hidden");
    wordSearchScreen.classList.remove("hidden");

    currentRound = 0;

    startTime = Date.now();

    timerInterval = setInterval(updateTimer, 10);
    startNextRound();

}

function startNextRound() {

    if (currentRound >= TOTAL_ROUNDS) {

        finishGame();
        return;

    }

    currentRound++;

    currentWord =
        WORDS[Math.floor(Math.random() * WORDS.length)];

    showWordThenBoard(currentWord);

}

// ============================
// SHOW WORD
// ============================

function showWordThenBoard(word) {

    boardContainer.classList.add("hidden");

    wordFlash.textContent = word;
    wordFlash.classList.remove("hidden");

    setTimeout(() => {

        wordFlash.classList.add("hidden");

        generateBoard(currentWord);

        boardContainer.classList.remove("hidden");

    }, 600);

}
// ============================
// REAL BOARD GENERATOR
// ============================

function generateBoard(word) {

    board.innerHTML = "";

    const LETTER_POOL = [
        "A","E","H","I",
        "K","L","M","N",
        "O","P","U","W","'"
    ];

    const SIZE = 10;

    // Create empty board
    const grid = [];

    for(let r = 0; r < SIZE; r++) {

        grid[r] = [];

        for(let c = 0; c < SIZE; c++) {
            grid[r][c] = "";
        }

    }

    // Directions
    const directions = [
        { dr: 0, dc: 1 }, // horizontal
        { dr: 1, dc: 0 }, // vertical
        { dr: 1, dc: 1 }  // diagonal
    ];

    const direction =
        directions[Math.floor(Math.random() * directions.length)];

    let startRow;
    let startCol;

    // Find valid position
    let placed = false;

    while(!placed) {

        startRow = Math.floor(Math.random() * SIZE);
        startCol = Math.floor(Math.random() * SIZE);

        const endRow =
            startRow + direction.dr * (word.length - 1);

        const endCol =
            startCol + direction.dc * (word.length - 1);

        if(
            endRow >= 0 &&
            endRow < SIZE &&
            endCol >= 0 &&
            endCol < SIZE
        ) {
            placed = true;
        }

    }

    // Place word
    for(let i = 0; i < word.length; i++) {

        const row = startRow + direction.dr * i;
        const col = startCol + direction.dc * i;

        grid[row][col] = word[i];

    }

    // Fill empty spots
    for(let r = 0; r < SIZE; r++) {

        for(let c = 0; c < SIZE; c++) {

            if(grid[r][c] === "") {

                grid[r][c] =
                    LETTER_POOL[
                        Math.floor(
                            Math.random() *
                            LETTER_POOL.length
                        )
                    ];

            }

        }

    }

    // Render board
    for(let r = 0; r < SIZE; r++) {

        for(let c = 0; c < SIZE; c++) {

            const cell = document.createElement("div");

            cell.className = "cell";

            cell.textContent = grid[r][c];

            cell.addEventListener("click", () => {

                const letter = cell.textContent;

                if (cell.classList.contains("selected")) {

                    cell.classList.remove("selected");

                    const index = selectedLetters.indexOf(letter);

                    if (index > -1) {
                        selectedLetters.splice(index, 1);
                    }

                } else {

                    cell.classList.add("selected");

                    selectedLetters.push(letter);

                }

                checkWord();

            });

            board.appendChild(cell);

        }

    }

}

function checkWord() {

    const selectedSorted =
        [...selectedLetters].sort().join("");

    const targetSorted =
        currentWord.split("").sort().join("");

    if (
        selectedLetters.length === currentWord.length &&
        selectedSorted === targetSorted
    ) {

        setTimeout(() => {

            selectedLetters = [];

            startNextRound();

        }, 700);

    }

}

function updateTimer() {

    const elapsed = Date.now() - startTime;

    const seconds = (elapsed / 1000).toFixed(2);

    document.getElementById("timer").textContent =
        seconds + "s";

}

function finishGame() {

    clearInterval(timerInterval);

    finalTime.textContent =
        document.getElementById("timer").textContent;

    wordSearchScreen.classList.add("hidden");

    completeScreen.classList.remove("hidden");

    setTimeout(() => {

        completeScreen.classList.add("hidden");

        mainMenu.classList.remove("hidden");

    }, 2500);

}

// ============================
// BACK BUTTON
// ============================

backBtn.addEventListener("click", () => {

    wordSearchScreen.classList.add("hidden");
    mainMenu.classList.remove("hidden");

});


// ============================
// COCONUT DANCE
// ============================

const coconutBtn = document.getElementById("coconutBtn");

const coconutScreen =
    document.getElementById("coconutScreen");

const coconutBackBtn =
    document.getElementById("coconutBackBtn");

const coconutBoard =
    document.getElementById("coconutBoard");

const coconutTimer =
    document.getElementById("coconutTimer");

const coconutRound =
    document.getElementById("coconutRound");

const penaltyText =
    document.getElementById("penaltyText");

const coconutCompleteScreen =
    document.getElementById("coconutCompleteScreen");

const coconutFinalTime =
    document.getElementById("coconutFinalTime");

const COCONUT_IMAGES = [
    "assets/Coconut.png",
    "assets/Pineapple.png",
    "assets/Sun.png",
    "assets/Tree.png",
    "assets/Volcano.png"
];

let coconutRoundNumber = 0;
let coconutStartTime = 0;
let coconutTimerInterval = null;
let coconutLocked = false;

// START

coconutBtn.addEventListener("click", startCoconutDance);

function startCoconutDance() {

    mainMenu.classList.add("hidden");

    coconutScreen.classList.remove("hidden");

    coconutRoundNumber = 0;

    coconutStartTime = Date.now();

    clearInterval(coconutTimerInterval);

    coconutTimerInterval =
        setInterval(updateCoconutTimer, 10);

    nextCoconutRound();

}

function updateCoconutTimer() {

    const elapsed =
        Date.now() - coconutStartTime;

    coconutTimer.textContent =
        (elapsed / 1000).toFixed(2) + "s";

}

function nextCoconutRound() {

    if (coconutRoundNumber >= 15) {

        finishCoconutDance();
        return;

    }

    coconutRoundNumber++;

    coconutRound.textContent =
        `Round ${coconutRoundNumber} / 15`;

    generateCoconutBoard();

}

function generateCoconutBoard() {

    coconutLocked = false;

    penaltyText.textContent = "";

    coconutBoard.innerHTML = "";

    const shuffled =
        [...COCONUT_IMAGES]
        .sort(() => Math.random() - 0.5);

    const unique =
        shuffled[0];

    const pairs =
        shuffled.slice(1);

    const tiles = [
        unique,
        pairs[0], pairs[0],
        pairs[1], pairs[1],
        pairs[2], pairs[2],
        pairs[3], pairs[3]
    ];

    tiles.sort(() => Math.random() - 0.5);

    tiles.forEach(image => {

        const tile =
            document.createElement("div");

        tile.className =
            "coconutTile";

        const img =
            document.createElement("img");

        img.src = image;

        tile.appendChild(img);

        tile.addEventListener("click", () => {

            if (coconutLocked)
                return;

            if (image === unique) {

                coconutLocked = true;

                setTimeout(() => {

                    nextCoconutRound();

                }, 700);

            } else {

                startPenalty();

            }

        });

        coconutBoard.appendChild(tile);

    });

}

function startPenalty() {

    coconutLocked = true;

    let timeLeft = 5;

    penaltyText.textContent =
        `Penalty: ${timeLeft}`;

    const penaltyInterval =
        setInterval(() => {

            timeLeft--;

            penaltyText.textContent =
                `Penalty: ${timeLeft}`;

            if (timeLeft <= 0) {

                clearInterval(
                    penaltyInterval
                );

                generateCoconutBoard();

            }

        }, 1000);

}

function finishCoconutDance() {

    clearInterval(
        coconutTimerInterval
    );

    coconutFinalTime.textContent =
        coconutTimer.textContent;

    coconutScreen.classList.add(
        "hidden"
    );

    coconutCompleteScreen.classList.remove(
        "hidden"
    );

    setTimeout(() => {

        coconutCompleteScreen.classList.add(
            "hidden"
        );

        mainMenu.classList.remove(
            "hidden"
        );

    }, 2500);

}

coconutBackBtn.addEventListener(
    "click",
    () => {

        clearInterval(
            coconutTimerInterval
        );

        coconutScreen.classList.add(
            "hidden"
        );

        mainMenu.classList.remove(
            "hidden"
        );

    }
);
