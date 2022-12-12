export async function fetchStockData(orgCode) {
  let url =
    "https://www.alphavantage.co/" +
    "query?function=TIME_SERIES_MONTHLY&symbol=" +
    orgCode +
    "&apikey=S7E74EBAW1P7UHEE";

  let stockData = await fetch(url)
    .then((response) => response.json())
    .then((data) => data);

  return stockData;
}

async function storeFormattedData() {
  let stockData = await fetchStockData("IBM");

  let formattedData = [];

  for (let week in stockData["Monthly Time Series"]) {
    formattedData.push({
      date: week,
      close: Number(stockData["Monthly Time Series"][week]["4. close"]),
    });
  }

  let jsonData = JSON.stringify(formattedData);
  // fs.writeFile("./formattedData/apple.json", jsonData);

  // console.log(jsonData);
}

import * as d3 from "d3";

export async function formatData(dataPath) {
  let allData = await d3.csv(dataPath);
  allData = allData.map((d) => {
    return {
      Country: d["Country Name"],
      Year: Number(d.Year),
      Count: Number(d.Count),
    };
  });

  allData.sort((a, b) => d3.ascending(a.Country, b.Country));
  console.log(allData);
  /*[
    {Country: "China",
    Values:[{
    Year:1960, Count:535430958
    },
    {
    Year:1961, Count:535453949
    },
  ]
  }
  ]
  */
  const firstYearData = allData.filter((d) => d.Year === 1960);

  const firstYearDataSorted = firstYearData.sort((a, b) =>
    d3.descending(a.Count, b.Count)
  );

  let top30Countries = [];
  for (let i = 0; i < 30; i++) {
    top30Countries.push(firstYearDataSorted[i].Country);
  }
  // const top30Countries = firstYearDataSorted.map((d, i) => {});

  console.log(top30Countries);
  //traverse all elements of alldata
  // for every element
  //

  let finalData = [];
  for (let country of top30Countries) {
    const result = allData.filter((d) => d.Country === country);
    const allValues = result.map((d) => {
      return { Year: d.Year, Count: d.Count };
    });
    const countryData = {
      Country: country,
      Values: allValues,
    };
    finalData.push(countryData);
  }
  return finalData;
}
