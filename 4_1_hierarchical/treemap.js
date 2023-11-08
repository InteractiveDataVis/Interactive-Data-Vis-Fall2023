/** CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

let svg;
let tooltip;

/** APPLICATION STATE */
let state = {
  data: null,
  hover: null
};

/** LOAD DATA */
d3.json("../data/flare.json", d3.autotype).then(data => {
  state.data = data;
  init();
});

/** INITIALIZING FUNCTION */
function init() {

  const colorScale = d3.scaleOrdinal(d3.schemeSet3);
  console.log(state.data)

  const container = d3.select("#container").style("position", "relative");

  tooltip = container.append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("top", 0)
    .style("left", 0)

  svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const root = d3.hierarchy(state.data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value)

  console.log(root)

  const treeGen = d3.treemap()
    .size([width , height])
    .paddingInner(1)
    .round(true)
    .tile(d3.treemapBinary)

  treeGen(root)

  const leaves = root.leaves();

  console.log(leaves)

  const leafGroups = svg
    .selectAll(".leaf")
    .data(leaves)
    .join("g")
    .attr("class", "leaf")
    .attr("transform", d => `translate(${d.x0}, ${d.y0})`)
    .on("mouseenter", (event, d) => {
      // console.log(event, d)
      state.hover = {
        position: [d.x0, d.y0],
        name: d.data.name,
        value: d.data.value
      }
      draw();
    })

  leafGroups.append("rect")
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill", d => {
      // grab level 1 category and use that for color
      const level1Ancestor = d.ancestors().find(d => d.depth === 1);
      return colorScale(level1Ancestor.data.name);
    })

  draw(); // calls the draw function
}

/** DRAW FUNCTION  */
function draw() {

  if (state.hover) {
    tooltip.html(
      `<div>Name: ${state.hover.name}</div>
      <div>Value: ${state.hover.value}</div>`
    )
    .transition()
    .duration(100)
    .style("transform", `translate(${state.hover.position[0]}px, ${state.hover.position[1]}px )`)
  }


}