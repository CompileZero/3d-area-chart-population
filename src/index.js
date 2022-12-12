import { svgDataUri, renderAreaChart } from "./areaChartRenderer";
import { render3dChart } from "./3dRenderer";
import { formatData } from "./dataFetcher";

// import "./dataFetcher";
// renderAreaChart(appleData);

// console.log(allData);
async function renderAllCharts() {
  const allData = await formatData("./population.csv");

  for (let i = 0; i < allData.length; i++) {
    await renderAreaChart(allData[i]);
    // console.log(allData);
  }

  // await renderAreaChart("./ind.csv");
  // await renderAreaChart("./usa.csv");
  await render3dChart(allData);
}
renderAllCharts();

// svgDataUri.then((uri) => {
//   render3dChart(uri);
// });
// render3dChart("a");
