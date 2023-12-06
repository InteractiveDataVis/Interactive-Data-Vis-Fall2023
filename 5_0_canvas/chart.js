export function chart() {
  const container = d3.select("#container")
    .append("div")
    .style("background-color", "aliceblue")
    .style("padding", "10em")
    .style("text-align", "center")
    .html("this could be a data visualization")
};