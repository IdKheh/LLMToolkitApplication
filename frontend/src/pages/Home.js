import { useState } from 'react';
import Form from './components/Form';
import Report from './components/Report';

import './css/Home.css';

const Home = () => {
	const [resultRequest, setResult] = useState([]);
	return(
		<div>
			<Form setResult={setResult} />
			<Report resultRequest={resultRequest} />
		</div>	
	);				
};

export default Home;