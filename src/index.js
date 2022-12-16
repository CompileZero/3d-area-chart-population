import { formatData } from "./dataFormatter";

async function main() {
  const allData = await formatData("./population.csv");
  console.log(allData);
}

main();
