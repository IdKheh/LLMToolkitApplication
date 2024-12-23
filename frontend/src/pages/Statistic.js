import './css/Statistic.css';
import ModelCard from './components/ModelCard';
import StatsCharts from './components/StatsCharts';
import { useState,useRef, useEffect } from 'react';
import axios from 'axios';
import PdfFile from './components/StatsPdfFile';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui'
import 'jquery-ui-dist/jquery-ui.css';

const Statistic = () => {
	const [modelName,setModelName] = useState('')
	const [isOpen,setIsOpen] = useState(false)
	const [modelData,setModelData] = useState(null)
	const [loading,setLoading] = useState(false)
	const [pdfLoading,setPdfLoading] = useState(false)
	const [error,setError] = useState('')
	const [top10Data, setTop10Data] = useState(null);
	const [modelRow,setModelRow] = useState(null);
  	const [similarPerformance, setSimilarPerformance] = useState(null);
  	const [sameFamily, setSameFamily] = useState(null);
	const [modelsNames,setModelsNames] = useState([]);
	const [modelsLoading,setModelsLoading] = useState(false)
	const [pdfImage,setPdfImage] = useState(null);
	const modelCardRef = useRef(null);
	const statsChartsRef = useRef(null);
	const inputRef = useRef(null);
	const printRef = useRef(null)

	useEffect(() => {
		// Fetch models list
		setModelsLoading(true)
		axios.get('http://localhost:8000/modelsList/')
		  .then(response => {
			const parsed = JSON.parse(response.data.message.modelsList)
			setModelsNames(parsed)
		  })
		  .catch(error => {
			console.error('Error fetching models list:', error);
		  })
		  .finally(
			setModelsLoading(false)
		  );
	  }, []);

	  useEffect(() => {
		if (inputRef.current) {
		  $(inputRef.current).autocomplete({
			source: modelsNames,
			select: (event, ui) => {
			  setModelName(ui.item.value);
			}
		  });
		}
	  }, [modelsNames]); 

	//   useEffect(() => {
	// 	if(modelData && top10Data && similarPerformance && modelName && sameFamily && modelRow){
	// 		setPdfLoading(true)
	// 		handleDownloadPdf();
	// 	}
	//   },[modelData,top10Data,similarPerformance,modelName,sameFamily,modelRow])

	// const handleDownloadPdf = async () => {
	// 	const element = printRef.current;
	// 	if (!element) {
	// 	console.error('Element not found');
	// 	return;
	// 	}
	// 	try {
	// 		setTimeout(async () => {
	// 			const canvas = await html2canvas(element);
	// 			const data = canvas.toDataURL('image/png');
	// 			console.log('Captured image data:', data);
	// 			setPdfImage(data);
	// 			setPdfLoading(false);
	// 		})
	// 	} catch (error) {
	// 	console.error('Error capturing image:', error);
	// 	}
	// };
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		console.log(modelName)
		axios.get(`http://localhost:8000/data/`, {
			params: {
			  modelName: modelName
			}
		  })
		.then(function (response) {
			console.log(response.data.message)
			const { modelCardData, top10Data, similarPerformance, sameFamily,modelRow } = response.data.message;
      		setModelData(modelCardData);
     	 	setTop10Data(top10Data);
      		setSimilarPerformance(similarPerformance);
      		setSameFamily(sameFamily);
			setModelRow(modelRow)
		})
		.catch((error) => {
			setError(error.message)
		})
		.finally(() => {
			setLoading(false);
		})	
	};
	
	

	return (
        <div id='container'>
			{modelsLoading  && (
			<div className="loader-container">
			<div className="bouncing-dots">
				<div className="dot"></div>
				<div className="dot"></div>
				<div className="dot"></div>
			</div>
		</div>
		)}
		{!modelsLoading &&(
			<>
			<h1 id='modelSelectText'>Please select a model</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={modelName}
					onChange={(e) => setModelName(e.target.value)}
                    placeholder="Enter model name"
					className='modelInput'
					ref={inputRef}
                />
                <button type="submit" className='submitButton'>Generate Report</button>
            </form>
			</>
		)}
            {loading  && (
				<div className="loader-container">
				<div className="bouncing-dots">
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
				</div>
			</div>
			)}
			
            {error && <p className='error'>{error}</p>}
            {modelData && top10Data && similarPerformance && sameFamily && modelRow &&(
                <>
				<div ref={printRef}>
					<div ref={modelCardRef}>
						<ModelCard data={modelData} />
					</div>
					<div ref={statsChartsRef}>
						<StatsCharts chosenModelName={modelName} top10Data={top10Data} similarPerformanceData={similarPerformance} sameFamilyData={sameFamily} modelRow={modelRow}/>
					</div>
					</div>
						<PDFDownloadLink 
						fileName="report.pdf" 
							 document={<PdfFile modelData={modelData} top10Data={top10Data} similarPerformance={similarPerformance} sameFamily={sameFamily} modelRow={modelRow}/>}>
							<button type="submit" className='submitButton'>Export to PDF</button>
						</PDFDownloadLink>
					<div layout className='card'>
						<p className="nameCard">About</p>
						<p>With the opulence of LLMs (large language models) and chatbots beeing released day upon the day it would be crucial to gain information about the performance of 
							the specific model compared to the rest of the most popular models. It would allow us to select the best model for the given task. Therefore we have construced a raport based on the results of Open LLM Leaderboard 2 by HuggingFace which is one of the most popular large language models 
							leaderboards up to this day. In the given analysis we take into consideration 6 key benchmarks and an average score calculated from them. Based on those we present charts that visualize the performance of chosen model. We also provide some information about the model that could be 
							a meaningful information for the user.</p>
							{isOpen ? <FaChevronUp className='expandArrow' onClick={() => {setIsOpen(!isOpen)}}/>:<FaChevronDown className='expandArrow' onClick={() => setIsOpen(!isOpen)}></FaChevronDown>}
							{isOpen && (
								<>
									<h2 className='bolded'>Benchmarks description</h2>
									<div className='benchmarkDesc'>
										<p className='bolded '>IFEval</p>
										<a href='https://arxiv.org/abs/2311.07911'>(https://arxiv.org/abs/2311.07911)</a>
										<p >is a dataset that test model's ability to follow specific instructions such as "include a word X" or "use format X". It focusese more on the output format than the generated content itself, therefore it allows to use more 
											strict and rigorous rating methods. It's  using 0-shot settings. 
										</p>
									</div>
									<div className='benchmarkDesc'>
										<p className='bolded'>BBH (Big Bench Hard)</p>
										<a href='https://arxiv.org/abs/2210.09261'>(https://arxiv.org/abs/2210.09261)</a>
										<p>is a subset of 23 challenging tasks from the BigBrench dataset for language models evaluation. The tasks are highly difficult and have
											sufficient sample size for statistical significance. The tasks vary from arithmetic and reasoning, through language understanding up to word knowledge.
											It is based on objective rating
										</p>
									</div>
									<div className='benchmarkDesc'>
										<p className='bolded'>MATH Lvl 5</p>
										<a href='ttps://arxiv.org/abs/2103.03874'>(https://arxiv.org/abs/2103.03874)</a>
										<p>is a compilation of high-school level math competition problems gathered from various sources. Their format is consistent
											because of the useage of Latex for equations and Asymptote for figures. The answers must fit a very specific output format. It is based only on 
											the level 5 Math questions. It's  using 3-shot settings. 
										</p>
									</div>
									<div className='benchmarkDesc'>
										<p className='bolded'>GPQA (Graduate-Level Google-Proof Q&A Benchmark)</p>
										<a href='https://arxiv.org/abs/2311.12022'>(https://arxiv.org/abs/2311.12022) </a>
										<p>is a highly challenging set of questions designed by the PhD level domain experts that test the knowledge of the model in fields
											such as biology, chrmistry or physics. The questions are designed to be very difficult for the laypersons but relatively easy for experts.
											The dataset has undergone multiple rounds of validation to ensure both difficulty and factual accuracy.
											Access to the dataset of the benchmark is restricted due to the protection from data contamination
											It's  using 4-shot settings.     
										</p>
									</div>
									<div className='benchmarkDesc'>
										<p className='bolded'>MUSR (Multistep Soft Reasoning)</p>
										<a href='https://arxiv.org/abs/2310.16049'>(https://arxiv.org/abs/2310.16049)</a>
										<p>is a dataset consisting of algoritmically generated complex problems, about 1,000 words each. The problems target reasoning tasks and includes 
											questions about murder mysteries, object placement questions, and team allocation optimizations. It tests model abilitity to conduct high level reasoning
											with long-range context parsing. It's  using 0-shot settings. 
										</p>
									</div>
									<div className='benchmarkDesc'>
										<p className='bolded' >MMLU-PRO (Massive Multitask Language Understanding - Professional)</p>
										<a href='https://arxiv.org/abs/2406.01574'>(https://arxiv.org/abs/2406.01574)</a>
										<p style={{marginBottom: 1 + 'em'}}>is a refined version of MMLU dataset which targeted multiple-choice knowledge assestments. Because of the increasing advancement of the 
											current day LLMs and discovery of some problems about original MMLU dataset such as noisy data and data contamination the MMLU-PRO benchmark 
											was created. It presents questions more questions, all of them with 10 choices options instead of 4 and undergoing expert reviews to detect noise.
											It's  using 5-shot settings. 
										</p>
									</div>
								
								</>
							)
							}
					</div>
                </>
            )}
        </div>
    );
};

export default Statistic;