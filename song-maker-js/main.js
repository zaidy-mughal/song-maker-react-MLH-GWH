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
NOTE_NAMES.forEach((noteName) => {
  const rowLabel = el("div", "row-label");
  rowLabel.textContent = noteName; // set the label text
  rowLabels.appendChild(rowLabel);
});

labelsLeftSide.appendChild(rowLabels);

gridLayout.appendChild(labelsLeftSide);

grid.appendChild(gridLayout);
