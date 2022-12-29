import { formatData } from "./dataFormatter";
import { renderAreaChart } from "./areaChart";

async function main() {
  const allData = await formatData("./population.csv");
  console.log(allData);

  // Render 2D Area Charts
  for (let i = 0; i < allData.length; i++) {
    await renderAreaChart(allData[i]);
  }
}

main();
