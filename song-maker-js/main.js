const grid = document.getElementById("grid");

const gridLayout = document.createElement("div");
gridLayout.className = "grid-layout";
gridLayout.id = "grid-layout";

const labelsLeftSide = document.createElement("div");
labelsLeftSide.className = "labels-left-side";

const rulerSpacer = document.createElement("div");
rulerSpacer.className = "ruler-spacer";

const rowLabel = document.createElement("div");
rowLabel.className = "row-label";

labelsLeftSide.appendChild(rulerSpacer);
labelsLeftSide.appendChild(rowLabel);

gridLayout.appendChild(labelsLeftSide);

grid.appendChild(gridLayout);
