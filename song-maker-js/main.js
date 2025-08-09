const grid = document.getElementById("grid");

const layout = document.createElement("div");
layout.className = "grid-layout";

const labelsCol = document.createElement("div");
labelsCol.className = "labels-left-side";

const spacer = document.createElement("div");
spacer.className = "ruler-spacer";

labelsCol.appendChild(spacer);

const labels = document.createElement("div");
labels.className = "row-label";

labelsCol.appendChild(labels);

layout.appendChild(labelsCol);
grid.appendChild(layout);
