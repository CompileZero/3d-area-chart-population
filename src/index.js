import { formatData } from "./dataFormatter";
import { renderAreaChart } from "./areaChart";
import { render3dChart } from "./3dChart";

async function main() {
  const allData = await formatData("./population.csv");

  // Render 2D Area Charts
  for (let i = 0; i < allData.length; i++) {
    await renderAreaChart(allData[i]);
  }

  await render3dChart(allData);
}

main();
