import * as d3 from "d3";

export function renderAreaChart(data) {
  let svg = d3
    .select(".container")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

  const tParser = d3.timeParse("%Y");

  const allYearsData = data.Values;

  let x = d3
    .scaleTime()
    .domain(
      d3.extent(allYearsData, function (d) {
        return tParser(d.Year);
      })
    )
    .range([0, 500]);

  let y = d3.scaleSqrt().domain([0, 1000000000]).range([500, 0]);

  svg
    .append("path")
    .datum(allYearsData)
    .attr("fill", "#cce5df")
    .attr(
      "d",
      d3
        .area()
        .x((d) => x(tParser(d.Year)))
        .y0(y(0))
        .y1((d) => y(d.Count))
        .curve(d3.curveCardinalOpen)
    );
}
