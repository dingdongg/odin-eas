/**
 * TODO: make it look prettier
 * TODO: replace prompt() functionality w/ something less annoying
 * TODO: color in pixel only when: a) mouse is passing thru, AND b) mouse is being held down
 */

// global variables 
const RESET_BUTTON = document.createElement('button');
const RANDOM_COLOR_TOGGLE_BUTTON = document.createElement('button');
const BRUSH_COLOR_SELECTOR = document.createElement('input');
const BACK_COLOR_SELECTOR = document.createElement('input');

const BUTTONS_CONTAINER = document.createElement('div');
const GRID_CONTAINER = document.querySelector('.grid-container');
const BODY = document.querySelector('body');
const DEFAULT_GRID_LENGTH = 16;
let gridLength = DEFAULT_GRID_LENGTH;
let randomColorMode = false;

// functions
function changeColor() {
    if (randomColorMode) {
        let redVal = Math.random() * 255;
        let blueVal = Math.random() * 255;
        let greenVal = Math.random() * 255;
        this.setAttribute("style", `background-color: rgb(${redVal}, ${blueVal}, ${greenVal});`);
    } else {
        this.setAttribute("style", `background-color: ${BRUSH_COLOR_SELECTOR.value};`);
    }
}   

function toggleRandomColor() {
    if (randomColorMode) {
        this.textContent = 'Random color off';
    } else {
        this.textContent = 'Random color on';
    }
    randomColorMode = !randomColorMode;
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
        cells.forEach(cell => GRID_CONTAINER.removeChild(cell));
    }
}

function getUserInput() {
    let parsedInput = DEFAULT_GRID_LENGTH;
    do {
        let userInput = prompt("Enter a grid size (from 1 to 100, inclusive!)");
        parsedInput = parseInt(userInput);
    } while (!parsedInput || parsedInput < 1 || parsedInput > 100); // beyond 100 grid length, performance issues spike up
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

function setUpRanColorBtn() {
    RANDOM_COLOR_TOGGLE_BUTTON.classList.add('random-color-button');
    RANDOM_COLOR_TOGGLE_BUTTON.textContent = 'Random color!';
    RANDOM_COLOR_TOGGLE_BUTTON.addEventListener('click', toggleRandomColor);
}

function setUpSelectors() {
    // set up brush selector
    BRUSH_COLOR_SELECTOR.type = 'color';
    BRUSH_COLOR_SELECTOR.id = 'brush-color';
    BRUSH_COLOR_SELECTOR.value = '#000000';
    
    BACK_COLOR_SELECTOR.type = 'color';
    BACK_COLOR_SELECTOR.id = 'background-color';
    BACK_COLOR_SELECTOR.value = '#ffffff';
    // set up background color selector
}

function appendColorLabels() {
    let brushLabel = document.createElement('label');
    brushLabel.textContent = 'Brush Color';
    brushLabel.for = `${BRUSH_COLOR_SELECTOR.id}`;

    let backgroundLabel = document.createElement('label');
    backgroundLabel.textContent = 'Background Color';
    backgroundLabel.for = `${BACK_COLOR_SELECTOR.id}`;

    BUTTONS_CONTAINER.appendChild(BRUSH_COLOR_SELECTOR);
    BUTTONS_CONTAINER.appendChild(brushLabel);
    BUTTONS_CONTAINER.appendChild(BACK_COLOR_SELECTOR);
    BUTTONS_CONTAINER.appendChild(backgroundLabel);
}

function setUpBtnContainer() {
    // add all buttons to this container
    BUTTONS_CONTAINER.classList.add('buttons-container');
    appendColorLabels();
    BUTTONS_CONTAINER.appendChild(RANDOM_COLOR_TOGGLE_BUTTON);
    BUTTONS_CONTAINER.appendChild(RESET_BUTTON);
}

function initPage() {
    setUpResetBtn();
    setUpRanColorBtn();
    setUpSelectors();
    setUpBtnContainer();
    BODY.insertBefore(BUTTONS_CONTAINER, GRID_CONTAINER);
    configureGrid();
}



// initialize website
initPage();

