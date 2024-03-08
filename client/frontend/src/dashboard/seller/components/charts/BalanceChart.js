import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { useSelector } from "react-redux";

const BalanceChart = () => {
  // fetch sales of the walletaddress (/getWalletSales)
  const [sales, setSales] = useState({});

  const user = useSelector((state) => state.user.user);
  const walletAddress = useSelector((state) => state.user.walletAddress);

  const fetchSales = async (walletAddress) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/nft/getWalletSales`,
        {
          walletAddress,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": user.jwtToken,
          },
        }
      );

      console.log(response.data);
      setSales(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (walletAddress) fetchSales(walletAddress);
  }, [walletAddress]);

  return (
    <>
      {sales && (
        <div className="bg-white rounded-xl">
          <Chart
            options={{
              chart: {
                id: "basic-area",
                fontFamily: "Inter, Graphik, sans-serif",
                toolbar: {
                  show: false,
                },
              },
              xaxis: {
                categories: sales.daysOfWeek,
                labels: {
                  style: {
                    colors: "#9CA3AF",
                    fontSize: 11,
                  },
                },
              },
              fill: {
                type: "gradient",
                gradient: {
                  shade: "dark",
                  type: "vertical",
                  gradientToColors: ["#E9D5FF", "rgb(96,66,196)"],
                  stops: [0, 500],
                },
              },
              dataLabels: {
                enabled: false,
              },
              tooltip: {
                enabled: true,
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                  const yValue = series[seriesIndex][dataPointIndex]; // Get the y-value

                  return (
                    '<div style="padding: 0.5rem 1rem; background-color: #ffffff; box-shadow: none; text-align: center; border: none; box-shadow: 0 0 0 1px #ffffff;">' +
                    `<span style="font-weight:900">${Number(yValue).toFixed(
                      5
                    )} ETH</span>` +
                    "</div>"
                  );
                },
              },
              colors: ["#7852F3"],
              grid: {
                show: false,
              },
              yaxis: {
                show: false,
              },

              stroke: {
                width: 3,
                curve: "smooth",
              },
            }}
            series={[
              {
                name: "series-1",
                data: sales.sales,
              },
            ]}
            type="area"
            width="100%"
            // height="180px"
            // height="100px"
          />
        </div>
      )}
    </>
  );
};

export default BalanceChart;
