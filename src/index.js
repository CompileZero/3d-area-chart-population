import { formatData } from "./dataFormatter";
import { renderAreaChart } from "./areaChart";

async function main() {
  const allData = await formatData("./population.csv");
  console.log(allData);

  for (let i = 0; i < allData.length; i++) {
    if ([0, 1, 28, 29].includes(i)) {
      await renderAreaChart(allData[i]);
    }
    // console.log(allData);
  }
}

main();
