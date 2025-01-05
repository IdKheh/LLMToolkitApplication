import { useState } from 'react';
import Form from './components/Form';
import Report from './components/Report';

const Home = () => {
	const [resultRequest, setResult] = useState([]);
	const [clickToRequest, setClicked] = useState(false);
	const [error, setError] = useState("");
  
	return(
		<div id="container">
			<Form setResult={setResult} setClicked={setClicked} setError={setError}/>
			<Report resultRequest={resultRequest} clickToRequest = {clickToRequest} error={error}/>
		</div>	
	);				
};

export default Home;