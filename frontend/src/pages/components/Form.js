import React, { useState, useRef } from 'react';
import axios from "axios";
import './Form.css';
import STRINGS from '../../Strings';

const Form = ({ setResult, setClicked, setError}) => {

    const [models, setModels] = useState([
        { model: "GPT-2", check: false },
        { model: "Llama-3.2-1B-Instruct", check: false },
        { model: "Llama-3.2-3B-Instruct", check: false },
        { model: "T5", check: false },
        { model: "I don't use models", check: true },
    ]);

    const [methods, setMethods] = useState([
        { method: "Automated Readability Index", check: false, group: "Proficiency"},
        { method: "Coleman-Liau", check: false, group: "Proficiency"},
        { method: "Dale-Chall", check: false, group: "Proficiency"},
        { method: "Flesch-Kincaid", check: false, group: "Proficiency"},
        { method: "Flesch-Kincaid Grade", check: false, group: "Proficiency"},
        { method: "FORCAST", check: false, group: "Proficiency"},
        { method: "Gunning Fog", check: false, group: "Proficiency"},
        { method: "Linsear Write", check: false, group: "Proficiency"},
        { method: "SMOG", check: false, group: "Proficiency" },
        { method: "SMOG Easier", check: false, group: "Proficiency" },
        { method: "Sprache Formula Original", check: false, group: "Proficiency" },
        { method: "Sprache Formula Revised", check: false, group: "Proficiency" },

        { method: STRINGS.POSTaggingName, check: false, group: "Grammar" },
        { method: STRINGS.GERLanguageToolName, check: false, group: "Grammar" },
        { method: STRINGS.GERIKorektorName, check: false, group: "Grammar" },
        { method: STRINGS.spellCheckerName, check: false, group: "Grammar" },
        { method: STRINGS.languageDetectionName, check: false, group: "Grammar" },

        { method: "BLEU", check: false, group: "Translation" },
        { method: "ROGUE", check: false, group: "Translation" },
        { method: "METEOR", check: false, group: "Translation" }

    ]);

    const inputRef = useRef();
    const inputReferenceTranslation = useRef();
    const [shwoTranslation, setTranslation] = useState(false);

    const handleChangeModels = (check, i) => {
        let modelsClone = [...models];
        modelsClone[i].check = !check;
        if (i === models.length - 1) {
            modelsClone = modelsClone.map((model, index) =>
                index === i ? model : { ...model, check: false }
            );
        } else {
            modelsClone[models.length - 1].check = false;
        }
    
        setModels(modelsClone);
    };

    const handleChangeMethods = (check, i) => {
        let tmp = methods[i];
        tmp.check = !check;
        let methodsClone = [...methods];
        methodsClone[i] = tmp;

        if (tmp.group === "Translation" && tmp.check) {
            setTranslation(true);
        }
        else if (tmp.group === "Translation" && methodsClone.filter(item => item.group === "Translation").every(item => !item.check)) {
            setTranslation(false);
        }
        setMethods([...methodsClone]);
    };

    const sendRequest = () => {
        const filteredModels = models.filter(item => item.check);
        const model = filteredModels.map(item => item.model);
        const filteredMethods = methods.filter(item => item.check);
        const method = filteredMethods.map(item => item.method);
        setClicked(true);
        setResult([]);
        setError("");

        axios.get(`http://localhost:8000/test/?modelsNLP=[${model}]&methods=[${method}]&textThema=${inputRef.current.value}&textTranslation=${inputReferenceTranslation.current.value}`)
            .then(function (response) {
                setResult(response.data.message);
                setClicked(false);
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.error) {
                    setError(error.response.data.error);
                } else {
                    setError("An unexpected error occurred.");
                }
                setClicked(false);
            });
    };

    return (
        <div id='content'>     
            <div id="LLModels" className="checkboxes">
                <p className="nameCheckbox">LLM</p>
                <div className="columns">
                    {models.map(({ model, check }, i) => (
                        <div key={i}>
                            <label htmlFor={`model-${i}`}>
                                <input
                                    id={`model-${i}`}
                                    type="checkbox"
                                    onChange={() => handleChangeModels(check, i)}
                                    checked={check}
                                    disabled={
                                        models[models.length - 1].check && i !== models.length - 1
                                    }
                                />
                                <span>{model}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div id='methods' className='checkboxes'>
                <p className='nameCheckbox'>Methods</p>
                <div className='columns'>
                    <p className='nameOfGroup'>Proficiency</p>
                    {methods.map(({ method, check, group }, i) => group === "Proficiency" && (
                        <div key={i}>
                            <label htmlFor={`method-P-${i}`}>
                                <input id={`method-P-${i}`} type="checkbox" onChange={() => handleChangeMethods(check, i)} checked={check}/>
                                <span>{method}</span>
                            </label>
                        </div>
                    ))}
                </div>
                <div className='columns'>
                    <p className='nameOfGroup'>Grammar</p>
                    {methods.map(({ method, check, group }, i) => group === "Grammar" && (
                        <div key={i}>
                            <label htmlFor={`method-G-${i}`}>
                                <input id={`method-G-${i}`} type="checkbox" onChange={() => handleChangeMethods(check, i)} checked={check}/>
                                <span>{method}</span>
                            </label>
                        </div>
                    ))}
                </div>
                <div className='columns'>
                    {/* <p className='nameOfGroup'>Translations</p> */}
                    {methods.map(({ method, check, group }, i) => group === "Translations" && (
                        <div key={i}>
                            <label htmlFor={`method-S-${i}`}>
                                <input id={`method-S-${i}`} type="checkbox" onChange={() => handleChangeMethods(check, i)} checked={check}/>
                                <span>{method}</span>
                            </label>
                        </div>
                    ))}
                </div>

                <div className='columns'>
                    <p className='nameOfGroup'>Translation</p>
                    {methods.map(({ method, check, group }, i) => group === "Translation" && (
                        <div key={i}>
                            <label htmlFor={`method-X-${i}`}>
                                <input id={`method-X-${i}`} 
                                type="checkbox" 
                                onChange={() => handleChangeMethods(check, i)} 
                                checked={check}/>
                                <span>{method}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className='inputs'>
                <textarea id='thema' ref={inputRef} placeholder='Write text there...' rows={5} cols={50}></textarea>
                {shwoTranslation && 
                    <textarea 
                        id='translation' 
                        ref={inputReferenceTranslation} 
                        placeholder='Write translation there...' 
                        rows={5} cols={50} 
                        style={{}}
                    ></textarea>
                }
            </div>
            
            <button id='submitButton' onClick={() => sendRequest()}>Generate report</button>
        </div>
    );
};

export default Form;