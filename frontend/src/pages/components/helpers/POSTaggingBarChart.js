import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);

const POSTaggingBarChart = ({ data }) => {
    const labels = Object.keys(data);
    const values = Object.values(data);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Number of tags",
                data: values,
                backgroundColor: 'rgba(173, 216, 230, 0.6)',
                borderColor: 'rgba(70, 130, 180, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div align="center">
            <h4>Bar chart illustrating various<br></br>parts of speech found in the given text:</h4>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default POSTaggingBarChart;