# Section 2 | Tutorial 4 | Geographic

The goals for this tutorial are:

- to reinforce the basic mechanics of how d3 allows you to [select](https://github.com/d3/d3-selection) HTML/SVG elements and map them to data elements.
- to explore GeoJSON data, and how geographical features on our earth translate to projected shapes on an svg.
- to understand [projections](https://github.com/d3/d3-geo#projections), in conjunction with [d3.geo-path](https://github.com/d3/d3-geo#geoPath), transforms lattitude and longitude space into pixel space.
- to grasp that d3.js svg maps are as simple as lines and circles, and can be manipulated as such, with stroke, fill, etc.

## Setup + Serve:

You should already have a local copy of your repository from the [tutorial 1](../1_1_getting_started/README.md). Start by getting a [basic server](../1_1_getting_started/3_BASIC_SERVER.md) up and running. This should include all the changes you've made thus far.

Once your local serve is up and reacting to code changes, you're ready to begin working on your tutorial assignment.
As you're building, don't forget you can always reference the [class code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2023/tree/class/) or the [demo code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2023/tree/demo/) for additional context.

## Assignment:

- [ ] Implement your own version of the map, using the nationalities data (`MoMA_nationalities.csv`) and the country geojson data (`world.json`) provided in the [data folder](../data/). 
- [ ] Create a world map that highlights countries that have artists represented in the provided dataset. **You are simply required to ensure those countries have solid fill, you do not need to color based on data.** ~~This means you'll have to do some data transformations and mapping to tie the nationality to its country (i.e. "Polish" --> "Poland"). You should do as much data mapping and manipulation as possible _before_ working in the browser and loading your file. You likely want to generate a new data file that would best help you tackle this task through another program (like excel or python).~~ 
  * **Originally, this assignment required some data transformations, but the latest data in this push includes the country name as it would correspond to the new geojson.**
- [ ] Make intentional design decisions -- colors, sizes, labels, etc. should illustrate something interesting about or relevant to your data.

**BONUS:**

- [ ] Use a color scale to create a choropleth, using the counts of artists to correspond to color. 
- [ ] Add another data element to your map, such as using color or radius to represent a value, [like this](https://observablehq.com/@d3/bubble-map) or [this](https://observablehq.com/@d3/non-contiguous-cartogram?collection=@d3/d3-geo).

## Deploy + Submit

Once you've completed the assignment, use the Github workflow to deploy your work to **your fork** of the course repository. Post the following as a comment to the appropriate post on the [commons site](https://data73200Fall2023.commons.gc.cuny.edu/):
1. a link to your committed code repository (your link will look something like: `https://github.com/[YOUR_USERNAME]/Interactive-Data-Vis-Fall2023/[TUTORIAL_PATH]/`)
2. a link to your deployed example (your link will look something like: `https://[YOUR_USERNAME].github.io/Interactive-Data-Vis-Fall2023/[TUTORIAL_PATH]/`)

