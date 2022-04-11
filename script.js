/**
 * TODO: finish buttons CSS
 * TODO: color in pixel only when: a) mouse is passing thru, AND b) mouse is being held down
 */

// global variables 
const RESET_BUTTON = document.createElement('button');
const RANDOM_COLOR_TOGGLE_BUTTON = document.createElement('button');
const BRUSH_COLOR_SELECTOR = document.createElement('input');
const BACK_COLOR_SELECTOR = document.createElement('input');
const RESOLUTION_SLIDER = document.createElement('input');

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
    // gridLength = getUserInput();
    GRID_CONTAINER.setAttribute("style", `grid-template-columns: repeat(${gridLength}, 1fr);`);
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

function updateButtonColor() {
    let colorContainer = this.parentElement;
    colorContainer.setAttribute("style", `background-color: ${this.value};`);
}

function setUpSelectors() {
    // set up brush selector
    BRUSH_COLOR_SELECTOR.type = 'color';
    BRUSH_COLOR_SELECTOR.id = 'brush-color';
    BRUSH_COLOR_SELECTOR.value = '#000000';
    BRUSH_COLOR_SELECTOR.addEventListener('change', updateButtonColor);
    
    BACK_COLOR_SELECTOR.type = 'color';
    BACK_COLOR_SELECTOR.id = 'bucket-color';
    BACK_COLOR_SELECTOR.value = '#ffffff';
    BACK_COLOR_SELECTOR.addEventListener('change', updateButtonColor);
    // set up background color selector
}

function applyBucket() {
    let cells = document.querySelectorAll('.row-cell');
    cells.forEach(cell => cell.setAttribute("style", `background-color: ${BACK_COLOR_SELECTOR.value};`));
}

function appendColorLabels() {
    let brushLabel = document.createElement('label');
    brushLabel.textContent = 'Brush Color';
    brushLabel.for = `${BRUSH_COLOR_SELECTOR.id}`;

    let backgroundLabel = document.createElement('label');
    backgroundLabel.textContent = 'Bucket Color';
    backgroundLabel.for = `${BACK_COLOR_SELECTOR.id}`;

    let brushContainer = document.createElement('div');
    brushContainer.classList.add('color-container');
    brushContainer.classList.add('brush-color');
    brushContainer.setAttribute("style", `background-color: ${BRUSH_COLOR_SELECTOR.value};`);
    brushContainer.appendChild(BRUSH_COLOR_SELECTOR);
    brushContainer.appendChild(brushLabel);
    BUTTONS_CONTAINER.appendChild(brushContainer);

    let bucketButton = document.createElement('button');
    bucketButton.classList.add('bucket-button');
    bucketButton.textContent = "Bucket";
    bucketButton.addEventListener('click', applyBucket);

    let backgroundContainer = document.createElement('div');
    backgroundContainer.classList.add('color-container');
    backgroundContainer.classList.add('bucket-color');
    backgroundContainer.setAttribute("style", `background-color: ${BACK_COLOR_SELECTOR.value};`);
    backgroundContainer.appendChild(BACK_COLOR_SELECTOR);
    backgroundContainer.appendChild(bucketButton);
    backgroundContainer.appendChild(backgroundLabel);
    BUTTONS_CONTAINER.appendChild(backgroundContainer);
}

function setUpBtnContainer() {
    // add all buttons to this container
    BUTTONS_CONTAINER.classList.add('buttons-container');
    appendColorLabels();
    BUTTONS_CONTAINER.appendChild(RANDOM_COLOR_TOGGLE_BUTTON);
    // BUTTONS_CONTAINER.appendChild(RESET_BUTTON);
    BUTTONS_CONTAINER.appendChild(RESOLUTION_SLIDER);
}

function updateResolution() {
    gridLength = parseInt(this.value);
    configureGrid();
}

function setUpResSlider() {
    let sliderDiv = document.createElement('div');
    sliderDiv.classList.add('slider-container');

    RESOLUTION_SLIDER.type = 'range';
    RESOLUTION_SLIDER.min = '1';
    RESOLUTION_SLIDER.max = '100';
    RESOLUTION_SLIDER.value = `${DEFAULT_GRID_LENGTH}`;
    RESOLUTION_SLIDER.classList.add('slider');
    RESOLUTION_SLIDER.addEventListener('change', updateResolution);

    sliderDiv.appendChild(RESOLUTION_SLIDER);
}

function initPage() {
    // setUpResetBtn();
    setUpResSlider();
    setUpRanColorBtn();
    setUpSelectors();
    setUpBtnContainer();
    BODY.insertBefore(BUTTONS_CONTAINER, GRID_CONTAINER);
    configureGrid();
}



// initialize website
initPage();

