import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, Title);

export const RadarChart = ({ chartData, title }) => {
  return (
    <div className="chart-container">
      <Radar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: title,
              font: {
                size: 20
              }
            }
          },
          scales: {
            r: {
              angleLines: {
                display: false 
              },
              suggestedMin: 1, 
              suggestedMax: 10  
            }
          }
        }}
        height={150} 
        width={300} 
      />
    </div>
  );
};