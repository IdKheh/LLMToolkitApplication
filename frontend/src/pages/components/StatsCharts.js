import React, { useRef } from 'react';
import './StatsCharts.css'
import { useState } from 'react';
import { BarChart } from './BarPlot.js';
import { CategoryScale } from "chart.js";
import { RadarChart } from './RadarChart.js'
import Chart from "chart.js/auto"

Chart.register(CategoryScale);



const StatsCharts = (data) => {
    console.log("Data:",data)
    const [isOpen,setIsOpen] = useState(false)
    let top10Parsed,similarPerformanceParsed,sameFamilyParsed,modelRow;
    try {
        console.log("Data model row", data.modelRow)
        top10Parsed = JSON.parse(data.top10Data)
        similarPerformanceParsed = JSON.parse(data.similarPerformanceData);
        sameFamilyParsed = JSON.parse(data.sameFamilyData);
        modelRow = JSON.parse(data.modelRow);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return <div>Error parsing model data</div>;
      }

    const transformData  = (data) => {
        const labels = data.map(model => model.fullname)
        const benchmarkNames = Object.keys(data[0]).filter(key => key !== 'fullname');
        const datasets = benchmarkNames.map(benchmark => ({
            label:benchmark,
            data: data.map(model => model[benchmark]),
        }))
        return {labels,datasets};
    }
    const top10ChartData = transformData(top10Parsed)
    const similarPerformanceChartData = transformData(similarPerformanceParsed)
    const sameFamilyChartData = transformData(sameFamilyParsed);

    const transformRadar = (dataset) => {
        const labels =  Object.keys(dataset[0]).filter(key => key !== 'fullname');
        const modelName = dataset[1].fullname
        const datasets = dataset.map(model => ({
            label: model.fullname,
            data: labels.map(label => model[label]),
            fill: true,
            backgroundColor: model.fullname === modelName ? 'rgba(255, 99, 132, 0.2)' : 'rgba(54, 162, 235, 0.2)',
            borderColor: model.fullname === modelName ? 'rgb(255, 99, 132)' : 'rgb(54, 162, 235)',
            pointBackgroundColor: model.fullname === modelName ? 'rgb(255, 99, 132)' : 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: model.fullname === modelName ? 'rgb(255, 99, 132)' : 'rgb(54, 162, 235)'
        }))
        return {labels,datasets}
    }

    const bestModelRadar = transformRadar([top10Parsed[0],modelRow[0]])
    const similarPerformanceRadar = transformRadar([similarPerformanceParsed[0],modelRow[0]])
    const bestFamilyModel = sameFamilyParsed[sameFamilyParsed.length-1]
    let familyChartTitle
    let sameFamilyRadar
    if (sameFamilyParsed.length > 1){
        if (bestFamilyModel.id === modelRow[0].id){
            sameFamilyRadar =  transformRadar([sameFamilyParsed[sameFamilyParsed.length-2],modelRow[0]])
            familyChartTitle ='Chosen model vs Same family model'
        } else{
            sameFamilyRadar =  transformRadar([sameFamilyParsed[sameFamilyParsed.length-1],modelRow[0]])
            familyChartTitle = 'Chosen model vs best model in the family'
        }
    }
    
    
    console.log("Len",sameFamilyParsed.length)
    console.log("Data for radar: ",sameFamilyParsed)
	return(
		<div id="content">
			<div className='card'>
                <p className="nameCard">Statistics charts</p>
                <div className='chartBox'>
                    <div className='barPlotBox'>
                        <BarChart chartData={top10ChartData} title={"Chosen model vs Best models"}></BarChart>
                    </div>
                    <div className='barPlotBox'>
                        <BarChart chartData={similarPerformanceChartData} title={"Chosen model vs Similar performing models"}></BarChart>
                    </div>
                    {sameFamilyParsed.length > 1 && (
                         <div className='barPlotBox'>
                         <BarChart chartData={sameFamilyChartData} title={"Chosen model vs Model's family of models"}></BarChart>
                     </div>
                    )}
                     {sameFamilyParsed.length== 1 && (
                         <div className='barPlotBox'>
                         <h2 className='noFamily'>It seems like the chosen model doesn't have any family of models</h2>
                     </div>
                    )}
                    <div className='radarBox'>
                        <RadarChart chartData={bestModelRadar} title={"Chosen model vs Best model in leaderboard"}></RadarChart>
                    </div>
                    <div className='radarBox'>
                        <RadarChart chartData={similarPerformanceRadar} title={"Chosen model vs Similar performing model"}></RadarChart>
                    </div>
                    {sameFamilyParsed.length > 1 && (
                          <div className='radarBox'>
                          <RadarChart chartData={sameFamilyRadar} title={familyChartTitle}></RadarChart>
                      </div>
                    )}
                </div>
            </div>
		</div>
	);				
};

export default StatsCharts;