import { useState } from 'react';
import Form from './components/Form';
import Report from './components/Report';

import './css/Statistic.css';

const Home = () => {
	const [resultRequest, setResult] = useState([]);
	return(
		<div>
			<p id='todo'>tutaj kiedyś będą wykresy</p>
		</div>	
	);				
};

export default Home;