/**
 * JSDoc.
 * Create a HTML element with provided class and id
 * @param {string} tag HTML tag
 * @param {string} cssClass class for the HTML tag
 * @param {string} idAttr id for the HTML tag
 * @returns {HTMLElement}
 * @example const myElement = el("span", "dummy-class", "dummy-id");
 * // It will create
 * <span class='dummy-class' id='dummy-id'></span>
 */
function el(tag, cssClass, idAttr) {
  const htmlElement = document.createElement(tag);
  if (cssClass) {
    htmlElement.className = cssClass;
  }
  if (idAttr) {
    htmlElement.id = idAttr;
  }

  return htmlElement;
}

const ROWS = 8; // total number of horizontal pitches
const COLS = 16; // total number of vertical time steps
/**
 * Names for each row / note names.
 * Numbers 3 and 2 refer to octaves. It is arranged in the order of highest note first.
 * More info: {@link https://www.musicandtheory.com/an-easy-guide-to-scientific-pitch-notation/}
 */
const NOTE_NAMES = ["C3", "B2", "A2", "G2", "F2", "E2", "D2", "C2"];

const grid = document.getElementById("grid");

const gridLayout = el("div", "grid-layout", "grid-layout-1"); // outer grid layout container

// Left column: notes labels
const labelsLeftSide = el("div", "labels-left-side", "labels-left-side-1");
const rulerSpacer = el("div", "ruler-spacer");
labelsLeftSide.appendChild(rulerSpacer);

const rowLabels = el("div", "row-labels"); // container for note labels
rowLabels.style.gridTemplateRows = `repeat(${ROWS}, 32px`; // dynamic ROWS

NOTE_NAMES.forEach((noteName) => {
  const rowLabel = el("div", "row-label");
  rowLabel.textContent = noteName; // set the label text
  rowLabels.appendChild(rowLabel);
});
labelsLeftSide.appendChild(rowLabels); // add labels to left column
gridLayout.appendChild(labelsLeftSide); // add left column to the layout

// Right column: ruler + clickable cells
const gridRightSide = el("div", "grid-right-side"); // container for ruler and grid
const ruler = el("div", "ruler"); // ruler on top to show beat numbers
ruler.style.gridTemplateColumns = `repeat(${COLS}, 32px)`; // dynamic COLS

for (let colIdx = 1; colIdx <= COLS; colIdx++) {
  const isBeat = colIdx % 4 === 0; // divide each colIdx by 4 and check if remainer is 0
  const rulerCell = el("div", `ruler-cell${isBeat ? " beat" : ""}`); // add 'beat' class every 4 columns
  rulerCell.textContent = colIdx;
  ruler.appendChild(rulerCell); // add to ruler
}
gridRightSide.appendChild(ruler); // add ruler to right column

const gridInner = el("div", "grid-inner");
gridInner.style.gridTemplateColumns = `repeat(${COLS}, 32px)`; // dynamic COLS

const gridState = Array.from({ length: ROWS }, () => Array(COLS).fill(false)); // 2D array for storing active notes. 'false' means it is inactive

// Understanding:
// 8 arrays of false, and each array will have 16 false
// [ [false, false, false...], [false, false, false...], [false, false, false...], ...]

function updateCellElement(cell, row, col) {
  const isActive = gridState[row][col];
  cell.classList.toggle("active", isActive); // add or remove the '.active' class
}

function toggleCellState(rowNumber, colNumber, cellElement) {
  gridState[rowNumber][colNumber] = !gridState[rowNumber][colNumber]; // flip the boolean
  updateCellElement(cellElement, rowNumber, colNumber); // update the cell appearance
}

for (let eachRow = 0; eachRow < ROWS; eachRow++) {
  for (let eachCol = 0; eachCol < COLS; eachCol++) {
    const cell = el("button", "cell");
    gridInner.appendChild(cell); // add cell to grid inner

    cell.addEventListener("click", () =>
      toggleCellState(eachRow, eachCol, cell)
    );
  }
}

gridRightSide.appendChild(gridInner);
gridLayout.appendChild(gridRightSide); // add grid right column to the layout
grid.appendChild(gridLayout);
