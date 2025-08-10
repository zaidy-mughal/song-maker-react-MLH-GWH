const ROWS = 8; // total number of horizontal pitches (notes)
const COLS = 16; // total number of vertical time steps (beats)

/**
 * Names for each row / note names.
 * Numbers 3 and 2 refer to octaves. It is arranged in the order of highest note first.
 * More info: {@link https://www.musicandtheory.com/an-easy-guide-to-scientific-pitch-notation/}
 */
const NOTE_NAMES = ["C3", "B2", "A2", "G2", "F2", "E2", "D2", "C2"]; // TODO: ADD MORE NOTES AND OCTAVES, MAKE IT DYNAMIC DEPENDING ON ROWS

/**
 * Create an HTML element with provided class and id
 * @param {string} tag - HTML tag name (e.g., 'div', 'span', 'button').
 * @param {string} cssClass - Class name(s) for the element.
 * @param {string} idAttr - ID for the element.
 * @returns {HTMLElement} The created HTML element.
 * @example
 * const myElement = el("span", "dummy-class", "dummy-id");
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

/**
 * Render the interactive grid for the song maker.
 * @param {HTMLElement} container - The DOM element to render the grid into.
 */
function renderGrid(container) {
  // Outer grid layout container
  const gridLayout = el("div", "grid-layout", "grid-layout-1");

  // Left column: note labels
  const labelsLeftSide = el("div", "labels-left-side", "labels-left-side-1");
  const rulerSpacer = el("div", "ruler-spacer"); // Spacer for alignment
  labelsLeftSide.appendChild(rulerSpacer);

  // Container for note labels
  const rowLabels = el("div", "row-labels");
  rowLabels.style.gridTemplateRows = `repeat(${ROWS}, 32px)`; // Set rows dynamically

  // Add note labels to the left side
  NOTE_NAMES.forEach((noteName) => {
    const rowLabel = el("div", "row-label");
    rowLabel.textContent = noteName; // Set the text content to the note name
    rowLabels.appendChild(rowLabel); // Append the label to the row labels container
  });
  labelsLeftSide.appendChild(rowLabels); // Add the row labels to the left side
  gridLayout.appendChild(labelsLeftSide); // Add the left side to the grid layout

  // Right column: ruler + clickable cells
  const gridRightSide = el("div", "grid-right-side"); // Right side of the grid

  // Ruler on top to show beat numbers
  const ruler = el("div", "ruler"); // Ruler element
  ruler.style.gridTemplateColumns = `repeat(${COLS}, 32px)`; // Set columns dynamically

  // Add beat numbers to the ruler
  for (let colIdx = 1; colIdx <= COLS; colIdx++) {
    const isBeat = colIdx % 4 === 0; // Highlight every 4th beat. This is done by checking if the column index is divisible by 4.
    const rulerCell = el("div", `ruler-cell${isBeat ? " beat" : ""}`); // Create a ruler cell with a class for beats
    rulerCell.textContent = colIdx;
    ruler.appendChild(rulerCell); // Append the ruler cell to the ruler
  }
  gridRightSide.appendChild(ruler); // Add the ruler to the right side of the grid

  const gridInner = el("div", "grid-inner"); // Inner grid container
  gridInner.style.gridTemplateColumns = `repeat(${COLS}, 32px)`; // Set columns dynamically

  /**
   * 2D array for storing active notes. 'false' means inactive.
   * Each cell corresponds to a note at a specific time step.
   * The gridState is initialized with 'false' for all cells.
   * @example
   * const gridState = [
   *   [false, false, false, ...], // Row 0 (C3) with 16 columns (see ROWS and COLS constants)
   *   [false, false, false, ...], // Row 1 (B2) with 16 columns
   * ... // and so on for each row and column
   * ];
   */
  const gridState = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

  /**
   * Update the visual state of a cell based on its active/inactive state.
   * @param {HTMLElement} cell - The cell element to update.
   * @param {number} row - Row index.
   * @param {number} col - Column index.
   */
  function updateCellElement(cell, row, col) {
    const isActive = gridState[row][col];
    cell.classList.toggle("active", isActive); // Toggle the 'active' class based on the cell's state
  }

  /**
   * Toggle the state of a cell and update its appearance.
   * @param {number} rowNumber - Row index.
   * @param {number} colNumber - Column index.
   * @param {HTMLElement} cellElement - The cell element to update.
   */
  function toggleCellState(rowNumber, colNumber, cellElement) {
    gridState[rowNumber][colNumber] = !gridState[rowNumber][colNumber]; // Toggle the state of the cell - true to active, false to inactive
    updateCellElement(cellElement, rowNumber, colNumber); // Update the cell's appearance based on its new state by adding or removing the 'active' class
  }

  // Create grid cells and add click event listeners
  for (let eachRow = 0; eachRow < ROWS; eachRow++) {
    for (let eachCol = 0; eachCol < COLS; eachCol++) {
      const cell = el("button", "cell");
      gridInner.appendChild(cell); // Append the cell to the inner grid

      /**
       * Add click event listener to each cell.
       * When clicked, it toggles the cell's state (false/true).
       * Event Listeners: {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener}
       */
      cell.addEventListener("click", () =>
        toggleCellState(eachRow, eachCol, cell)
      );
    }
  }

  gridRightSide.appendChild(gridInner); // Add the inner grid to the right side of the grid
  gridLayout.appendChild(gridRightSide); // Add the right side to the grid layout
  container.appendChild(gridLayout); // Finally, append the entire grid layout to the container
}

/**
 * Main entry point: renders the grid into the #grid element.
 */
function main() {
  const grid = document.getElementById("grid");
  renderGrid(grid);
}

main(); // Call the main function to run, when the script is loaded
