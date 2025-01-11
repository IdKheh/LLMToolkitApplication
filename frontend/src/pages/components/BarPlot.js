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
          aspectRatio:1,
          plugins: {
            title: {
              font: {
                size: 20
              },
              display: true,
              text: title,
            },
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              grid: {
                display: false, 
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
      />
    </div>
  );
};
