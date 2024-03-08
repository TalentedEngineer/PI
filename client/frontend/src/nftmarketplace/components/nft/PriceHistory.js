import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ethers } from "ethers";

const PriceHistory = ({ data }) => {
  const getFormattedPrice = (price) => {
    const BigNumber = ethers.BigNumber;
    const priceString = BigNumber.from(price._hex).toString();
    const humanReadablePrice = (parseFloat(priceString) / 1e18).toFixed(5);
    return Number(humanReadablePrice);
  };

  const [nftPrices, setnftPrices] = useState([]);
  const [nftDates, setnftDates] = useState([]);

  function formatTime(timestamp) {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds

    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  }

  const getPriceHistory = () => {
    const prices = data.slice(1).map((item) => {
      return getFormattedPrice(item.price);
    });

    const dates = data.slice(1).map((item) => {
      return formatTime(item.timestamp);
    });

    setnftPrices(prices);
    setnftDates(dates);
  };

  useEffect(() => {
    const prices = data.map((item) => getFormattedPrice(item.price));
    const dates = data.map((item) => formatTime(item.timestamp));

    setnftPrices(prices);
    setnftDates(dates);
  }, [data]);

  const [options, setOptions] = useState({
    chart: {
      id: "grouped-bar-line",
      fontFamily: "Inter, Graphik, sans-serif",
      width: "100%",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: nftDates,
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      // position: "top",
      // horizontalAlign: "left",
      // fontWeight: "600",
      // borderRadius: "100%",
      // fill: "transparent",
      show: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: "50%",
      },
      line: {
        markers: {
          show: true,
        },
      },
    },
    stroke: {
      width: [0, 3],
      colors: ["#7852F3", "#7852F3"],
      // curve: "smooth",
    },
    colors: ["#7852f340", "#ccc"],
    grid: {
      borderColor: "#F3F4F6",
    },
    markers: {
      size: 4,
      colors: ["#000", "#000"],
      strokeColors: "#7852F3",
      strokeWidth: 8,
      shape: "circle",
    },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const yValue = series[seriesIndex][dataPointIndex]; // Get the y-value

        return (
          '<div className="p-2 bg-white shadow-none text-center border-none shadow-white">' +
          `<span className="text-xs font-bold block">$${yValue} ETH</span>` +
          "</div>"
        );
      },
    },
  });
  const [series, setSeries] = useState([
    {
      type: "bar",
      data: nftPrices,
    },
    {
      name: "Line",
      type: "line",
      data: nftPrices,
    },
    // Add more series as needed
  ]);

  return (
    <div className="w-full">
      {nftDates && nftPrices && (
        <Chart
          options={{
            chart: {
              id: "grouped-bar-line",
              fontFamily: "Inter, Graphik, sans-serif",
              width: "100%",
              toolbar: {
                show: false,
              },
            },
            xaxis: {
              categories: nftDates,
            },
            yaxis: {
              tickAmount: 3,
              labels: {
                formatter: function (val) {
                  return val.toFixed(0);
                },
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              // position: "top",
              // horizontalAlign: "left",
              // fontWeight: "600",
              // borderRadius: "100%",
              // fill: "transparent",
              show: false,
            },
            plotOptions: {
              bar: {
                borderRadius: 5,
                columnWidth: "50%",
              },
              line: {
                markers: {
                  show: true,
                },
              },
            },
            stroke: {
              width: [0, 3],
              colors: ["#7852F3", "#7852F3"],
              curve: "smooth",
            },
            colors: ["#7852f340", "#ccc"],
            grid: {
              borderColor: "#F3F4F6",
            },
            markers: {
              size: 4,
              colors: ["#000", "#000"],
              strokeColors: "#7852F3",
              strokeWidth: 8,
              shape: "circle",
            },
            tooltip: {
              enabled: true,
              custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return (
                  '<div class="arrow_box" style="background:#7852F3">' +
                  "<h3 style='padding:10px;display:block; font-size:16px;padding-bottom:0px;font-weight:600;color:white;padding-top:5px'>" +
                  series[seriesIndex][dataPointIndex] +
                  " ETH</h3>" +
                  "<span style='padding:10px;display:block; font-size:12px;padding-top:0px;color:#ddd;padding-top:5px'>" +
                  w.globals.categoryLabels[dataPointIndex] +
                  "</div>"
                );
              },
            },
          }}
          series={[
            {
              type: "bar",
              data: nftPrices,
            },
            {
              name: "Line",
              type: "line",
              data: nftPrices,
            },
            // Add more series as needed
          ]}
          type="line"
          height="350px"
          width="100%"
        />
      )}
    </div>
  );
};

export default PriceHistory;
