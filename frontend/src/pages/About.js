import './css/About.css';

const About = () => {
	return(
		<div id="container">
			<p id='text'>The application is the result of our thesis project, created as a
				 demonstration of the capabilities of our proprietary LLMToolkit library.
				  It combines several well-known solutions, enabling a comprehensive approach
				   to the evaluation and analysis of language models (Large Language Models, LLM).
				   </p>
			<div id='profiles'>
				<div className='person'>
					<div className='name'>Wiktoria Dębowska</div>
					<div className='things'>
						<ul>
							<li>Frontend and backend to application</li>
							<li>Structure of library and application</li>
							<li>Implementation of proficiency part of the library</li>
							<li>Adding LLM to project</li>
						</ul>
					</div>
				</div>
				<div className='person'>
					<div className='name'>Dawid Drożdżyński</div>
					<div className='things'>
							<ul>
								<li>Implementation of checking grammar and spelling methods in the library</li>
								<li>Implementation of downloading report in PDF format on frontend</li>
								<li>Contributing in building frontend and backend features</li>
							</ul>
					</div>
				</div>
				<div className='person'>
					<div className='name'>Jakub Filipiak</div>
					<div className='things'>
							<ul>
								<li>xxxx</li>
								<li>xxxx</li>
								<li>xxxx</li>
							</ul>
					</div>
				</div>
				<div className='person'>
					<div className='name'>Miłosz Koźlicki</div>
					<div className='things'>
							<ul>
								<li>Implementation of the Statistic part of the application</li>
								<li>Implementation of the Statistic PDF raport</li>
								<li>Implementation of the HuggingFace API and Open LLM Leaderboard data processing</li>
							</ul>
					</div>
				</div>
			</div>
		</div>	
	);				
};

export default About;