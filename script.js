/**
 * TODO: make it look prettier
 * TODO: add brush color selector
 * TODO: optional random color 
 * TODO: refactor code
 * TODO: replace prompt() functionality w/ something less annoying
 */

// global variables 
const RESET_BUTTON = document.createElement('button');
const GRID_CONTAINER = document.querySelector('.grid-container');
const BODY = document.querySelector('body');
let gridLength;
let parsedInput;

// functions
function changeColor() {
    let classes = this.classList.value;
    console.log(classes);
    if (!classes.includes('hovered')) {
        this.classList.toggle('hovered');
    }
}

function createCells(numCells) {
    for (let i = 0; i < numCells; i++) {
        let cell = document.createElement('div');
        cell.classList.add("row-cell");
        cell.addEventListener('mouseenter', changeColor);
        GRID_CONTAINER.appendChild(cell);
    }
}

function resetCells() {
    if (GRID_CONTAINER.children.length != 0) {
        let cells = document.querySelectorAll('.row-cell');
        cells.forEach(cell => container.removeChild(cell));
    }
}

function getUserInput() {
    let parsedInput = 16; // default value of 16
    do {
        let userInput = prompt("Enter a grid size (from 1 to 100, inclusive!)");
        parsedInput = parseInt(userInput);
    } while (!parsedInput || parsedInput < 1 || parsedInput > 100);
    return parsedInput;
}

function configureGrid() {
    resetCells();
    gridLength = getUserInput();

    GRID_CONTAINER.setAttribute("style", `grid-template-columns: repeat(${gridLength}, 1fr`);
    let numCells = gridLength * gridLength;
    createCells(numCells);
}

function setUpResetBtn() {
    RESET_BUTTON.classList.add('reset-button');
    RESET_BUTTON.textContent = 'Reset grid';
    RESET_BUTTON.addEventListener('click', configureGrid);
}

function initPage() {
    setUpResetBtn();
    BODY.insertBefore(RESET_BUTTON, GRID_CONTAINER);
    configureGrid();
}



// initialize website
initPage();

