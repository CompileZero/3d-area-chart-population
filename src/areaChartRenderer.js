import { appleData, ibmData } from "./formattedData/formattedData";
import * as d3 from "d3";
import { svgAsDataUri } from "save-svg-as-png";
let svgDataUri;

export function renderAreaChart(data) {
  let svg = d3
    .select(".container")
    .append("svg")
    // .attr("stroke", "#69b3a2")
    // .attr("stroke-linejoin", "round")
    // .attr("stroke-linecap", "round")

    // .attr("stroke-width", "10px")
    .attr("width", 550)
    .attr("height", 5000);

  const tParser = d3.timeParse("%Y");

  const csvdata = data.Values;

  // for (let i = 0; i < csvdata.length; i++) {}

  var x = d3
    .scaleTime()
    .domain(
      d3.extent(csvdata, function (d) {
        return tParser(d.Year);
      })
    )
    .range([0, 500]);

  var y = d3.scaleSqrt().domain([0, 1500000000]).range([1500, 0]);
  // var y = d3.scaleLinear().domain([0, 1500000000]).range([5000, 0]);

  svg
    .append("path")
    .datum(csvdata)
    .attr("fill", "#cce5df")
    .attr(
      "d",
      d3
        .area()
        .x(function (d) {
          return x(tParser(d.Year));
        })
        .y0(y(0))
        .y1(function (d) {
          return y(d.Count) - 250;
        })
        .curve(d3.curveCardinalOpen)
    );

  svgDataUri = svgAsDataUri(document.querySelector("svg"), {
    scale: 8,
  });
}

export { svgDataUri };
