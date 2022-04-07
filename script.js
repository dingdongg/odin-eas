// create a 16 x 16 grid of SQUARE <div>s

let GRID_LENGTH = 16;

let body = document.querySelector('body');

// for each row, create GRID_LENGTH divs
for (let i = 0; i < GRID_LENGTH; i++) {
    let rowStartDiv = document.createElement('div');
    for (let j = 1; j < GRID_LENGTH; j++) {
        let toAppend = document.createElement('div');
        rowStartDiv.appendChild(toAppend);
    }
    body.appendChild(rowStartDiv);
}

