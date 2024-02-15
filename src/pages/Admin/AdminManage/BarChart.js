import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Chart.js 구성 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
// 색상 배열
const colors = [
  "rgba(255, 99, 132, 0.5)",
  "rgba(75, 192, 192, 0.5)",
  "rgba(255, 205, 86, 0.5)",
  "rgba(201, 203, 207, 0.5)",
  "rgba(54, 162, 235, 0.5)",
  // 필요에 따라 추가 색상을 여기에 추가
];

const BarChart = ({ chartData }) => {
  // 데이터셋이 비어있는 경우 기본값 설정
  const data = chartData || {
    labels: [],
    datasets: [],
  };

  // 각 데이터 포인트에 대한 색상 동적 할당
  if (data.datasets && data.datasets.length > 0) {
    data.datasets.forEach((dataset, i) => {
      // 데이터셋의 데이터 길이에 맞게 색상 배열 생성
      const backgroundColor = dataset.data.map(
        (_, index) => colors[index % colors.length],
      );
      dataset.backgroundColor = backgroundColor; // 동적으로 생성된 색상 배열 사용
      delete dataset.borderColor;
    });
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // 범례 표시하지 않음
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
