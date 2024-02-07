import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = ({ categories }) => {
  const labels = categories.map((category) => category.name);
  const data = categories.map((category) => category.cnt);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "카테고리별 판매량",
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(201, 203, 207, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: Math.max(...data) + 1,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return <PolarArea data={chartData} options={options} />;
};

export default PolarAreaChart;
