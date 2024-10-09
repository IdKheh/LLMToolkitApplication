import React from 'react';
import './Report.css'

const Report = ({ resultRequest }) => {
    return (
        <div>
            {resultRequest.length > 0 ? 
                <ul id='raport'>
                    {resultRequest.map((model, modelIndex) => (
                        <li className='models' key={modelIndex}>
                            <h3>{model.nameModel}</h3>
                            <ul className='methods'>
                                {model.methodsResult.map((method, methodIndex) => (
                                    <li className='method' key={methodIndex}>
                                        <p className='nameMethod'>{method.nameMethod}</p> 
                                        <p className='valueMethod'>{method.value}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}     
                </ul>  
            : 
                <p></p>
            }
        </div>
    );
};

export default Report;
