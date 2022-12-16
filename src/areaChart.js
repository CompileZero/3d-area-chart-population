import * as d3 from "d3";

export function renderAreaChart(data) {
  let svg = d3
    .select(".container")
    .append("svg")
    .attr("width", 550)
    .attr("height", 500);

  const tParser = d3.timeParse("%Y");

  const csvdata = data.Values;

  var x = d3
    .scaleTime()
    .domain(
      d3.extent(csvdata, function (d) {
        return tParser(d.Year);
      })
    )
    .range([0, 550]);

  var y = d3.scaleSqrt().domain([0, 2000000000]).range([300, 0]);

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
}
