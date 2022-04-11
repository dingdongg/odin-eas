let parsedInput;
let GRID_LENGTH;
let container;
configureGrid();

/**
 * TODO: make it look prettier
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

