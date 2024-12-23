import { Bar } from "react-chartjs-2";
import { useRef, useEffect } from 'react';

export const BarChart = ({ chartData, title }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = chartRef.current?.chartInstance;
  }, []);

  return (
    <div className="chart-container">
      <Bar
        ref={chartRef}
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: true,
              text: title,
            },
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              ticks: {
                font:{
                  size:11,
                },
              },
              grid: {
                display: false, // Optional: Hide grid lines for a cleaner look
                padding:0,
              },
            },
            y:{
              grid:{
                offset:false,
              },
            }
          },
        }}
        height={150}
        width={300}
      />
    </div>
  );
};
