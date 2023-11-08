

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

  console.log(state.data)

  const container = d3.select("#container").style("position", "relative");
  svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);

   // create root based on hierarchy
   const root = d3.hierarchy(state.data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);

    console.log(root)

    const packGen = d3.pack()
      .size([width, height])
      .padding(3)

    packGen(root)

      // define the descendants for the visualization
    const descendants = root.descendants();

    console.log(descendants)

    const circles = svg.selectAll("circle.pack")
      .data(descendants)
      .join("circle")
      .attr("class", "pack")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("stroke", d => d.children ? '#ccc' : null)
      .attr("fill", d => d.children ? 'transparent' : "chucknorris")
      .attr("fill-opacity", 0.8)


  
  draw(); // calls the draw function
}

/** DRAW FUNCTION */
function draw() {
  


}