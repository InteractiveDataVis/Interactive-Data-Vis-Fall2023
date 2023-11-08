const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

/** -------------- DATA AND SCALES -------------- */

// radius is set prior to the data generator, so its domain can be referenced
const r = d3.scaleSqrt(
  [100, 1000],
  [1, Math.sqrt(width * height) / 30]
);

// random data generator
const dataGenerator = () => {
  const random = d3.randomNormal();
  return Array
    .from({ length: 100 })
    .map(d => ({ value: random(), size: d3.randomUniform(...r.domain())() }));
}
const data = dataGenerator();

// x scale based on the random data
const x = d3.scaleLinear(
  d3.extent(data, d => d.value),
  [0, width]
);

/** -------------- BEESWARM GENERATOR -------------- */

const beeswarm = beeswarmForce()
  .x(d => x(d.value))
  .y(height / 2)
  .r(d => 1 + r(d.size))

const nodes = beeswarm(data)

/** -------------- APPEND TO DOM -------------- */

const container = d3.select("#container")

const svg = container
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const g = svg.append("g")
      .attr("transform", `translate(${[margin.left, margin.top]})`);
  
g.append("g")
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .attr("transform", `translate(0, ${height / 1.25})`);

g.selectAll("circle")
    .data(nodes)
  .join("circle")
    .attr("stroke", "black")
    .attr("fill-opacity", 0.8)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => r(d.data.size));


/** -------------- DATA AND SCALES -------------- */

function beeswarmForce () {
  let x = d => d[0];
  let y = d => d[1];
  let r = d => d[2];
  let ticks = 300;
  
  function beeswarm(data){
    const entries = data.map(d => {
      return {
        x0: typeof x === "function" ? x(d) : x,
        y0: typeof y === "function" ? y(d) : y,
        r: typeof r === "function" ? r(d) : r,
        data: d
      }
    });
    
    const simulation = d3.forceSimulation(entries)
        .force("x", d3.forceX(d => d.x0))
        .force("y", d3.forceY(d => d.y0))
        .force("collide", d3.forceCollide(d => d.r));
    
    for (let i = 0; i < ticks; i++) simulation.tick();
    
    return entries;
  }
  
  beeswarm.x = f => f ? (x = f, beeswarm) : x;
  beeswarm.y = f => f ? (y = f, beeswarm) : y;
  beeswarm.r = f => f ? (r = f, beeswarm) : r;
  beeswarm.ticks = n => n ? (ticks = n, beeswarm) : ticks;
  
  return beeswarm;
}