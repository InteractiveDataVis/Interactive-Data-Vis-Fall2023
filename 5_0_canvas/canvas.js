
export function canvas() {
  const canvas = d3.select("#canvas").node();
  const context = canvas.getContext("2d");

  context.canvas.style.maxWidth = "100%";
  context.lineJoin = "round";
  context.lineCap = "round";
  context.imageSmoothingEnabled = true;

  let timer;
  const duration = 10000;
  const width = 900;
  const height = 500;
  const ease = d3.easeLinear;
  const startRadius = 3;

  Promise.all([
    d3.json("counties-10m.json"),
    d3.csv("uscities.csv")
  ]).then(([us, raw_cities]) => {

    const projection = d3.geoAlbersUsa();
    const path = d3.geoPath(projection, context)

    const cities = raw_cities
      .filter(city => +city.population > 5000)
      .sort((a, z) => z.population - a.population)
      .map(city => ({
        population: city.population,
        start: startRadius,
        end: 0,
        current: startRadius,
        coords: projection([city.lng, city.lat])
      }))
      .filter(city => city.coords !== null);

    function drawNation() {
      // states
      context.beginPath(); // starting path
      context.lineWidth = 0.25; // set styles
      context.strokeStyle = "#00000080"; // set styles
      path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)); // create path
      context.stroke(); // apply stroke styles

      // nation
      context.beginPath();
      context.lineWidth = 0.5;
      context.strokeStyle = "#000";
      path(topojson.feature(us, us.objects.nation));
      context.stroke();
    }

    function pointStyles() {
      context.fillStyle = "#94d2ff";
      context.strokeStyle = "#EEE";
      context.lineWidth = 0.5;
    }

    function drawPoints(data) {
      for (var i = 0, n = data.length; i < n; ++i) {
        const city = data[i];
        if (city.current >= 0) {
          context.beginPath();
          context.arc(...city.coords, city.current, 0, city.current * Math.PI);
          context.fill();
          context.stroke();
        }
      }
    }

    function animate() {
      timer = d3.timer(elapsed => {
        context.clearRect(0, 0, width, height);
        pointStyles();

        const time = Math.min(1, ease(elapsed / duration));
        const filtered = cities.filter((c, i) => (1 - time) * cities.length < i);

        filtered.forEach(city => {
          city.current -= 0.05;
          if (city.current < city.end) city.current = city.start;
        });

        drawPoints(filtered);
        drawNation();

        if (time === 1) {
          timer.stop();
        }
      });
    }

    animate();
  })

}