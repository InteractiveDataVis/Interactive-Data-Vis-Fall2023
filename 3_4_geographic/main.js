/** CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
height = window.innerHeight * 0.7,
margin = { top: 20, bottom: 50, left: 60, right: 40 };

let svg;

/** APPLICATION STATE */
let state = {
  geojson: null,
  hover: {
    lat: null, 
    long: null, 
    state: null
  }
};

/** LOAD DATA */
Promise.all([
    d3.json("../data/usState.json")
]).then(([geojson]) => {
    state.geojson = geojson;
    console.log("state: ", state);
    init();
});

/** INITIALIZING FUNCTION: this will be run *one time* when the data finishes loading in */
function init() {
  const projection = d3.geoAlbersUsa().fitSize([width, height], state.geojson);
  const path = d3.geoPath().projection(projection);

  svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "aliceblue")

  svg.selectAll("path.us-state")
    .data(state.geojson.features)
    .join("path")
    // .attr("d", d => path(d))
    .attr("d", path)
    .attr("class", "us-state")
    .attr("fill", "transparent")
    .attr("stroke", "black")
    .on("mouseover", (ev, d) => {
      state.hover.state = d.properties.NAME;
      draw();
    })

  svg.on("mousemove", (ev) => {
    // console.log(ev)
    // const position = d3.pointer(ev)
    const [mx, my] = d3.pointer(ev)
    const [long, lat] = projection.invert([mx, my])
    state.hover.long = long
    state.hover.lat = lat
    draw();
  })

  draw(); 
}

/** DRAW FUNCTION: we call this every time there is an update to the data/state */
function draw() {

  d3.select("#hover-content")
    .html(`
      <div>State: ${state.hover.state}</div>
      <div>Long: ${state.hover.long}</div>
      <div>Lat: ${state.hover.lat}</div>
    `)


  /// DO STUFF



}