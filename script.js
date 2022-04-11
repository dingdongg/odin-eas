let parsedInput;
let GRID_LENGTH;
let container;
configureGrid();

// HTML element handles
const RESET_BUTTON = document.createElement('button');
const BODY = document.querySelector('body');
const GRID_CONTAINER = document.querySelector('.grid-container');


/**
 * sections of code
 * 1. element variables
 * 2. functions
 * 3. code to get website up and running
 */

/**
 * TODO: make it look prettier
 * TODO: add brush color selector
 * TODO: optional random color 
 * TODO: refactor code
 * TODO: replace prompt() functionality w/ something less annoying
 */


let resetButton = document.createElement('button');
resetButton.classList.add('reset-button');
resetButton.textContent = 'Reset grid';
resetButton.addEventListener('click', configureGrid);
let body = document.querySelector('body');
body.insertBefore(resetButton, container);

function changeColor() {
    let classes = this.classList.value;
    console.log(classes);
    if (!classes.includes('hovered')) {
        this.classList.toggle('hovered');
    }
}

function configureGrid() {
    do {
        let userInput = prompt("Enter a grid size (from 1 to 100, inclusive!)");
        parsedInput = parseInt(userInput);
    } while (!parsedInput || parsedInput < 1 || parsedInput > 100);

    container = document.querySelector('.grid-container');
    
    if (container.children.length != 0) {
        let cells = document.querySelectorAll('.row-cell');
        cells.forEach(cell => container.removeChild(cell));
    }
    GRID_LENGTH = parsedInput;
    container.setAttribute("style", `grid-template-columns: repeat(${GRID_LENGTH}, 1fr`);
    let numCells = GRID_LENGTH * GRID_LENGTH;
    
    for (let i = 0; i < numCells; i++) {
        let cell = document.createElement('div');
        cell.classList.add("row-cell");
        cell.addEventListener('mouseenter', changeColor);
        container.appendChild(cell);
    }
}

