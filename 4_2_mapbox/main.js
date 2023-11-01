mapboxgl.accessToken = 'pk.eyJ1IjoiZWxsaWVmcnkiLCJhIjoiY2o5enluZXB5MzBzYjMxcG9yMWI5d2xmdiJ9.pCo7CReR4UZ41AYPSXGgKA';

const usThing = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/elliefry/cloexil62002c01q16w1acdu9', // style URL
  center: [-96, 37.09], // starting position [lng, lat]
  zoom: 3, // starting zoom
});

const gc = new mapboxgl.Marker()
  .setLngLat([-73.9833, 40.7423])
  .setPopup(new mapboxgl.Popup().setHTML(
    `
    <h3>Graduate Center</h3>
    <div>City University of New York</div>
    <div>365 5th Ave, New York, NY 10016</div>
    <div>Coordinates: [-73.9833, 40.7423]</div>
    `
  ))
  .addTo(usThing)

d3.csv("../data/usHeatExtremes.csv", d3.autoType)
  .then(data => {

    const [min, max] = d3.extent(data.map(d => d['Change in 95 percent Days']))
    const colorScale = d3.scaleLinear()
      .domain([min, 0, max])
      .range(["blue", "white", "red"])

    // const heatSpots = data.map()
    data
    .filter(point => point['Change in 95 percent Days'] !== 0)
    .forEach(point => {
      new mapboxgl.Marker({
        scale: 0.5,
        color: colorScale(point['Change in 95 percent Days'])
      })
        .setLngLat([point.Long, point.Lat])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <h4>Heat Extreme</h4>
          <div>temp change: ${point['Change in 95 percent Days']}</div>
        `))
        .addTo(usThing)
    })
  })