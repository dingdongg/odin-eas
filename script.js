// create a 16 x 16 grid of SQUARE <div>s
let parsedInput;
do {
    let userInput = prompt("Enter a grid size (from 1 to 100, inclusive!)");
    parsedInput = parseInt(userInput);
} while (parsedInput == NaN || parsedInput < 1 || parsedInput > 100);

let GRID_LENGTH = parsedInput;

function changeColor() {
    this.classList.toggle('hovered');
}

let container = document.querySelector('.grid-container');

// for each row, create GRID_LENGTH divs
for (let i = 0; i < GRID_LENGTH; i++) {
    let rowStartDiv = document.createElement('div');
    rowStartDiv.classList.add("row");
    for (let j = 0; j < GRID_LENGTH; j++) {
        let toAppend = document.createElement('div');
        toAppend.classList.add("row-cell");
        rowStartDiv.appendChild(toAppend);
    }
    container.appendChild(rowStartDiv);
}

let cells = document.querySelectorAll('.row-cell');

cells.forEach(cell => {
    cell.addEventListener('mouseenter', changeColor)
});

cells.forEach(cell => {
    cell.addEventListener('mouseleave', changeColor)
});

