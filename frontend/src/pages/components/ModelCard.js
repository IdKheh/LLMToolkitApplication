import React from 'react';
import './ModelCard.css'

const ModelCard = (modelData) => {

    let parsedData;
    console.log(modelData.data)
    try {
      parsedData = JSON.parse(modelData.data);
      console.log(parsedData)
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return <div>Error parsing model data</div>;
    }
    if(parsedData == "NoModel"){
        return(
        <div className='card'>
                <p className="nameCard">Model summary</p>
                <h2 className='noModel'>It seems like there is no repository for this model</h2>
            </div>

        )
    }   
    const { Name, Author, Parameters, Usage, "Technology used": TechnologyUsed, Language,"Leaderboard average":Average } = parsedData;

	return(
		<div id="content">
			<div className='card'>
                <p className="nameCard">Model summary</p>
                <p><span>Name:</span> <span className="res_info">{Name}</span></p>
                <p><span>Author:</span> <span className="res_info">{Author}</span></p>
                <p><span>Parameters:</span> <span className="res_info">{Parameters}</span></p>
                <p><span>Usage:</span> <span className="res_info">{Usage}</span></p>
                <p><span>Technology used:</span> <span className="res_info">{TechnologyUsed}</span></p>
                <p><span>Language:</span> <span className="res_info">{Language}</span></p>
                <p><span>Leaderboard average:</span> <span className="res_info">{Average}</span></p>
            </div>
		</div>
	);				
};

export default ModelCard;