import React, { useState } from 'react';
import STRINGS from '../../../Strings';
import './ErrorsList.css'

const ErrorsList = ({ errorsArray, methodName }) => {
    const [showErrors, setShowErrors] = useState(false);

    const toggleErrors = () => {
        setShowErrors((prev) => !prev);
    };

    return (
        <div>
            <button className="errorsButton" onClick={toggleErrors}>
                {showErrors ? STRINGS.hideErrorsText : STRINGS.showErrorsText}
            </button>
            {methodName === STRINGS.GERLanguageToolName && showErrors && errorsArray.length > 0 && (
                <ul>
                    {errorsArray.map((error, index) => (
                        <li className="errorsListElement" key={index}>
                            <b>Sentence: {error.sentence}</b>
                            <p>Message: {error.shortMessage ? error.shortMessage : error.message}</p>
                            <p>Rule: {error.rule.description}</p>
                        </li>
                    ))}
                </ul>
            )}
            {methodName === STRINGS.GERIKorektorName && showErrors && errorsArray.succs.length > 0 && (
                <ul>
                    {errorsArray.succs.map((error, index) => (
                        <li className="errorsListElement" key={index}>
                            <b>Error: "{error.error}" should be: "{error.correction}"</b>
                            <p>Comment: {error.comments[0]}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ErrorsList;
