import React from 'react';
import './Report.css'
import POSTaggingBarChart from './helpers/POSTaggingBarChart';
import STRINGS from '../../Strings';
import ErrorsList from './helpers/ErrorsList';
import PDFDownloadComponent from './helpers/PDFDownloadComponent';

const allMethods = [
    { method: "Automated Readability Index",
        information: [{values: "<1.0", schoolClass: "Kindergarten"},
            {values: "1.0-2.0", schoolClass: "1"},
            {values: "2.0-3.0", schoolClass: "2"},
            {values: "3.0-4.0", schoolClass: "3"},
            {values: "4.0-5.0", schoolClass: "4"},
            {values: "5.0-6.0", schoolClass: "5"},
            {values: "6.0-7.0", schoolClass: "6"},
            {values: "7.0-8.0", schoolClass: "7"},
            {values: "8.0-9.0", schoolClass: "8"},
            {values: "9.0-10.0", schoolClass: "9"},
            {values: "10.0-11.0", schoolClass: "10"},
            {values: "11.0-12.0", schoolClass: "11"},
            {values: "12.0-13.0", schoolClass: "12"},
            {values: "13.0-14.0", schoolClass: "College"}]},
    { method: "Coleman-Liau", information:[{values:"Value is class"}] },
    { method: "Dale-Chall", information:[{values: "<4.9", schoolClass: "<4"},
            {values: "5.0-5.9", schoolClass: "5-6"},
            {values: "6.0-6.9", schoolClass: "7-8"},
            {values: "7.0-7.9", schoolClass: "9-10"},
            {values: "8.0-8.9", schoolClass: "11-12"},
            {values: "9.0-9.9", schoolClass: "College"}]},
    { method: "Flesch-Kincaid", information:[{values: "100-90", schoolClass: "5"},
        {values: "90-80", schoolClass: "6"},
        {values: "80-70", schoolClass: "7"},
        {values: "70-60", schoolClass: "8 and 9"},
        {values: "60-50", schoolClass: "10 - 12"},
        {values: "50-30", schoolClass: "College"},
        {values: "30-10", schoolClass: "College graduate"},
        {values: "10-0", schoolClass: "Professional"}]},
    { method: "Flesch-Kincaid Grade", information:[{values:"Value is class"}] },
    { method: "FORCAST", information:[{values: "<0.5", schoolClass: "1"},
        {values: "<1.3", schoolClass: "2"},
        {values: "<2.1", schoolClass: "3"},
        {values: "<2.9", schoolClass: "4"},
        {values: "<3.7", schoolClass: "5"},
        {values: "<4.5", schoolClass: "6"},
        {values: "<5.3", schoolClass: "7"},
        {values: "<6.1", schoolClass: "8"},
        {values: "<6.9", schoolClass: "9"},
        {values: "<7.7", schoolClass: "10"},
        {values: "<8.5", schoolClass: "11"},
        {values: "<9.3", schoolClass: "12"},
        {values: "<10.1", schoolClass: "13"},
        {values: "<10.9", schoolClass: "14"}]},
    { method: "Gunning Fog", information:[
        {values: "<6", schoolClass: "6"},
            {values: "6.0-7.0", schoolClass: "7"},
            {values: "7.0-8.0", schoolClass: "8"},
            {values: "8.0-9.0", schoolClass: "High school freshman"},
            {values: "9.0-10.0", schoolClass: "High school sophomore"},
            {values: "10.0-11.0", schoolClass: "High school junior"},
            {values: "11.0-12.0", schoolClass: "High school senior"},
            {values: "12.0-13.0", schoolClass: "College freshman"},
            {values: "13.0-14.0", schoolClass: "College sophomore"},
            {values: "14.0-15.0", schoolClass: "College junior"},
            {values: "15.0-16.0", schoolClass: "College senior"},
            {values: "16.0-17.0", schoolClass: "College graduate"}]},
    { method: "Linsear Write", information: [{values:"Value is class"}] },
    { method: "SMOG", information: [{values:"Value is class"}]},
    { method: "SMOG Easier", information: [{values:"Value is class"}]},
    { method: "Sprache Formula Original", information: [{values:"Value is class"}]},
    { method: "Sprache Formula Revised", information: [{values:"Value is class"}]},
    { method: STRINGS.GERLanguageToolName, information: [{values: STRINGS.GERValue}]},
    { method: STRINGS.GERIKorektorName, information: [{values: STRINGS.GERValue}]},
    { method: STRINGS.spellCheckerName, information: [{values: STRINGS.spellCheckerValue}]},
    { method: STRINGS.languageDetectionName, information: [{values: STRINGS.languageDetectionValue}]}
];

const getInformacyDetails = (methodName) => {
    const method = allMethods.find((m) => m.method === methodName);

    if (!method || !method.information.length) {
        return <p></p>;
    }

    return (
        <ul className="informacy-list">
            <li className="informacy-item header">
                <span className="info-value">Values</span>
                <span className="info-description">Class</span>
            </li>
            {method.information.map((info, index) => (
                <li key={index} className="informacy-item">
                    <span className="info-value">{info.values}</span>
                    <span className="info-description">{info.schoolClass}</span>
                </li>
            ))}
        </ul>
    );
};

const getDisplayedValue = (value, name) => {
    if (name === STRINGS.POSTaggingName) {
        return <POSTaggingBarChart data={value} />;
    }
    if (name === STRINGS.GERLanguageToolName || name === STRINGS.GERIKorektorName) {
        value = parseFloat(value[0]);
        value = Math.round(value * 100) / 100;
        value = value + "%";
    }
    if (name === STRINGS.spellCheckerName) {
        value = Object.keys(value).length;
    }
    if (name === STRINGS.languageDetectionName) {
        var displayedValue = "";
        for (var i=0; i < value.length; i++) {
            displayedValue += value[i].language;
            displayedValue += ": " + Math.round(value[i].confidence * 100) + "%";
            displayedValue += "; ";
        }
        value = displayedValue;
    }
    
    return (
        <>
            {value}
            <span className="info-icon material-icons">info</span>
            <div className="informacy-popup">
                {getInformacyDetails(name)}
            </div>
        </>
    );
};

const Report = ({ resultRequest, clickToRequest , error}) => {
    if(!clickToRequest && error.length>0) return <p id='error'>{error}</p>
    if(!clickToRequest && resultRequest.length > 0) return (
      <div>
        <ul id="report">
                    {resultRequest.map((model, modelIndex) => (
                        <li className="models" key={modelIndex}>
                            <h3>{model.nameModel}</h3>
                            <p className='output-model'>{model.modelResponse}</p>
                            <ul className="methods">
                                {model.methodsResult.map((method, methodIndex) => (
                                    <li className="method" key={methodIndex}>
                                        <p className="nameMethod">
                                            {method.nameMethod} <br></br>
                                            {[STRINGS.GERLanguageToolName, STRINGS.GERIKorektorName, STRINGS.spellCheckerName].includes(method.nameMethod) && (
                                                <ErrorsList 
                                                    errorsArray={method.nameMethod === STRINGS.spellCheckerName ? method.value : method.value[1]} 
                                                    methodName={method.nameMethod}
                                                />
                                            )}
                                        </p>
                                        <div className="info-container">
                                            {getDisplayedValue(method.value, method.nameMethod)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <PDFDownloadComponent result={resultRequest} />
              </div>
    )

    if(clickToRequest) return(<div className="loader-container">
        <div className="bouncing-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    </div>)

    if(!clickToRequest) return <p></p>
};

export default Report;