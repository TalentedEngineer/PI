import React, { useState } from "react";
import Chart from "react-apexcharts";

const OrderChart = ({ series }) => {
  const [options, setOptions] = useState({
    chart: {
      id: "grouped-bar",
      fontFamily: "Inter, Graphik, sans-serif",
      width: "100%",
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
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontWeight: "600",
      borderRadius: "100%",
      fill: "transparent",
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: "50%",
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    colors: ["#7852F3", "#ccc"],
    grid: {
      borderColor: "#F3F4F6",
    },
  });

  // const [series, setSeries] = useState([
  //   {
  //     name: "Completed",
  //     data: [200, 190, 230, 180, 200, 220, 250, 280, 300, 320, 350, 380],
  //   },
  //   {
  //     name: "Canceled",
  //     data: [80, 60, 100, 120, 100, 200, 50, 155, 140, 100, 120, 100],
  //   },
  // ]);

  return (
    <div className="w-full">
      <Chart
        options={options}
        series={series}
        type="bar"
        height="350px"
        width="100%"
      />
    </div>
  );
};

export default OrderChart;
