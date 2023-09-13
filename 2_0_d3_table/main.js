
/* CONSTANTS AND GLOBALS */
// const width = ;
// const height = ;

/* LOAD DATA */
d3.csv('./roster.csv', d3.autoType)
  .then(students => {
    console.log("students", students)

    const container = d3.select("#container")
    // console.log('container', container)

    // container.selectAll(".thing")
    //   .data([0,1,2,3])
    //   .join("div")
    //   .attr("class", "thing")
    //   .html(d => d)

    // container.append("div").html("this is a div")

    const table = container
      .append("table")
      .attr("class", "roster")
    // console.log('table', table)

    const getStudentLastName = (d) => d.Last

    const rows = table.selectAll("tr")
      .data(students)
      .join("tr")
      .attr("id", (d) => { 
        // console.log(d)
        return d.Last 
      })
      // .attr("id", getStudentLastName)
      // .attr("class", function(student) {
      //   return student.First
      // })

    console.log(rows)
    
    rows
      .append("td")
      .html(d => d.First)

    rows
      .append("td")
      .html(d => d.Last)

    // rows.selectAll("td.cell")
    //   .data(d => {
    //     console.log(d)
    //     return [d.First, d.Last]
    //   })
    //   .join("td")
    //   .attr("class","cell")
    //   .html(d => d)
    
  })