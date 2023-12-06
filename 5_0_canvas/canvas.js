const canvasContainer = d3.select("#canvas")
  .style("border", "solid 1px black")
const canvas = canvasContainer.node();
const ctx = canvas.getContext("2d");

// ctx.fillRect(25, 25, 100, 100)

// ctx.strokeRect(25, 150, 100, 100)

// ctx.beginPath();
// ctx.moveTo(100,25);
// ctx.lineTo(125,25);
// ctx.lineTo(150,50);
// // ctx.lineTo(125,50);
// ctx.closePath();
// ctx.stroke();

// ctx.beginPath();
// ctx.moveTo(25, 25);
// ctx.lineTo(105, 25);
// ctx.lineTo(25, 105);
// ctx.fill();

for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 3; j++) {
    ctx.beginPath();
    const x = 25 + (j * 50);
    const y = 25 + (i * 50);
    const radius = 20;
    const endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
    const counterclockwise = i % 2 !== 0; // clockwise or counterclockwise

    ctx.arc(x, y, radius, endAngle, counterclockwise);
    // ctx.fill();

    if (i > 1) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }
}