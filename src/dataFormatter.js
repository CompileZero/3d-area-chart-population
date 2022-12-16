import * as d3 from "d3";

export async function formatData(dataPath) {
  let allData = await d3.csv(dataPath);

  // Type Conversion
  allData = allData.map((d) => {
    return {
      Country: d["Country Name"],
      Year: Number(d.Year),
      Count: Number(d.Count),
    };
  });

  // Get Initial Year Data for all countries and
  // sort highest count first
  const firstYearSorted = allData
    .filter((d) => d.Year === 1960)
    .sort((a, b) => d3.descending(a.Count, b.Count));

  console.log(firstYearSorted);

  // Create an array of objects for the top 30 countries
  for (let i = 0; i < 30; i++) {
    let country = firstYearSorted[i].Country;

    // Get all data of a country and
    // return an array of objects with
    // year and the population count
    const allYearsData = allData
      .filter((d) => d.Country === country)
      .map((d) => ({ Year: d.Year, Count: d.Count }));

    const countryData = {
      Country: country,
      Values: allYearsData,
    };

    finalData.push(countryData);
  }

  return finalData;
}
