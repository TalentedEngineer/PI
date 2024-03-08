import React, { useState } from "react";
import Chart from "react-apexcharts";

const EarningChart = ({ series }) => {
  const [options, setOptions] = useState({
    chart: {
      id: "basic-area",
      fontFamily: "Inter, Graphik, sans-serif",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#7852F3"],
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const xLabel = options.xaxis.categories[dataPointIndex]; // Get the x-axis label
        const yValue = series[seriesIndex][dataPointIndex]; // Get the y-value

        return (
          '<div className="py-1 px-4 bg-white shadow-md text-center border-none shadow-gray-300">' +
          `<span className="text-xs font-bold block">$${yValue}</span>` +
          `<span className="text-xs block">${xLabel}</span>` +
          "</div>"
        );
      },
    },
    colors: ["#7852F3"],
    grid: {
      borderColor: "#F3F4F6",
    },
  });

  // const [series, setSeries] = useState([
  //   {
  //     name: "series-1",
  //     data: [900, 400, 200, 300, 600, 700, 300, 91],
  //   },
  // ]);

  return (
    <div className="bg-white">
      <Chart
        options={options}
        series={series}
        type="area"
        width="100%"
        height="350px"
      />
    </div>
  );
};

export default EarningChart;
