/**
 * TODO: color in pixel only when: a) mouse is passing thru, AND b) mouse is being held down
 */

// global variables 
const RANDOM_COLOR_TOGGLE_BUTTON = document.querySelector('.random-color-button');
const BRUSH_COLOR_SELECTOR = document.querySelector("#brush-color");
const BUCKET_COLOR_SELECTOR = document.querySelector("#bucket-color");
const RESOLUTION_SLIDER = document.querySelector(".slider");
const GRID_CONTAINER = document.querySelector('.grid-container');

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

function configureGrid() {
    resetCells();
    GRID_CONTAINER.setAttribute("style", `grid-template-columns: repeat(${gridLength}, 1fr);`);
    let numCells = gridLength * gridLength;
    createCells(numCells);
}

function setUpRanColorBtn() {
    RANDOM_COLOR_TOGGLE_BUTTON.addEventListener('click', toggleRandomColor);
}

function updateButtonColor() {
    let colorContainer = this.parentElement;
    colorContainer.setAttribute("style", `background-color: ${this.value};`);
}

function setUpSelectors() {
    // set up brush selector
    BRUSH_COLOR_SELECTOR.value = '#000000';
    BRUSH_COLOR_SELECTOR.addEventListener('input', updateButtonColor);
    
    BUCKET_COLOR_SELECTOR.value = '#ffffff';
    BUCKET_COLOR_SELECTOR.addEventListener('input', updateButtonColor);
    // set up bucket color selector
}

function applyBucket() {
    let cells = document.querySelectorAll('.row-cell');
    cells.forEach(cell => cell.setAttribute("style", `background-color: ${BUCKET_COLOR_SELECTOR.value};`));
}

function colorSelectors() {
    let brushContainer = BRUSH_COLOR_SELECTOR.parentElement;
    brushContainer.setAttribute("style", `background-color: ${BRUSH_COLOR_SELECTOR.value};`);

    let bucketButton = document.querySelector('.bucket-button');
    bucketButton.addEventListener('click', applyBucket);

    let bucketContainer = BUCKET_COLOR_SELECTOR.parentElement;
    bucketContainer.setAttribute("style", `background-color: ${BUCKET_COLOR_SELECTOR.value};`);
}

function updateResLabel() {
    let sliderLabel = document.querySelector('.slider-label');
    console.log(sliderLabel);
    sliderLabel.textContent = `Resolution: ${gridLength} × ${gridLength}`;
}

function updateResolution() {
    gridLength = parseInt(this.value);
    updateResLabel();
    configureGrid();
}

function setUpResSlider() {
    RESOLUTION_SLIDER.value = `${DEFAULT_GRID_LENGTH}`;
    RESOLUTION_SLIDER.addEventListener('change', updateResolution);
}

function initPage() {
    setUpSelectors();
    colorSelectors();
    setUpRanColorBtn();
    setUpResSlider();
    configureGrid();
}



// initialize website
initPage();

