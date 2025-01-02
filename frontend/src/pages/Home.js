import { useState } from 'react';
import Form from './components/Form';
import Report from './components/Report';

import './css/Home.css';

const Home = () => {
	const [resultRequest, setResult] = useState([]);
	const [clickToRequest, setClicked] = useState(false);

	
	return(
		<div id="container">

			<Form setResult={setResult} setClicked={setClicked} />
			<Report resultRequest={resultRequest} clickToRequest = {clickToRequest} />
		</div>	
	);				
};

export default Home;