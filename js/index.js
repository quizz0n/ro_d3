// make D3 aware of the <svg> element in the HTML
var svg = d3.select("svg");

// get <svg> width and height from HTML instead of hard-coding values
var svgWidth = +svg.attr("viewBox").split(" ")[2],
    svgHeight = +svg.attr("viewBox").split(" ")[3];

// define the map center
var RO_CENTER = [25.0094303, 45.9442858];

// define the map projection
var projection = d3.geoMercator()
  .center(RO_CENTER)
  .fitSize([svgWidth, svgHeight], {type: "Sphere"});

// NOTE: if you want to skip setting the translate and scale values
// and instead zoom out to the whole world, you can just use this shortcut:
// projection.fitSize([svgWidth, svgHeight], {
//   type: "Sphere"
// });

var geoPathGenerator = d3.geoPath().projection(projection);

d3.json("data/rocounties.json")
  .then(function(loadedTopoJson) {
    var geoJson = topojson.mesh(
      loadedTopoJson,
      loadedTopoJson.features
    );
    console.log(loadedTopoJson.features)
    console.log(geoJson)
svg
  .append("path")
  .attr("d", geoPathGenerator(geoJson))
  .attr("class", "feature");
});
