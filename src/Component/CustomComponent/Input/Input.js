import React from 'react';
import './Input.css';
import Textinputcomponent from '../Textinputcomponent';
import Reactselectcomponent from '../Reactselectcomponent';
import Radiocomponent from '../Radiocomponent';
import Textareacomponent from '../Textareacomponent';

const input = (props) => {

    let inputElement = null;
    const divClassess = ["col-md-4"];
    const inputClasses = ["form-control"];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push("Invalid");
    }

    if (props.elementType == "Date") {
        divClassess.push("customFormGroup");
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className="text-danger">{props.errorMsg}</p>;
    }

    switch (props.elementType) {
        case ('input'):

        //     inputElement = <input className={inputClasses.join(' ')}
        //         {...props.elementConfig} value={props.value} onChange={props.changed} />;
        //     break;

        // case ('textarea'):
        //     inputElement = <textarea className={inputClasses.join(' ')}
        //         {...props.elementConfig} value={props.value} onChange={props.changed} />;
        //     break;

        // case ('select'):
        //     inputElement = <select
        //         className={inputClasses.join(' ')}
        //         value={props.value} onChange={props.changed}>
        //         {
        //             props.elementConfig.options.map(option => (
        //                 <option key={option.value} value={option.value}>{option.displayValue}</option>
        //             ))
        //         }
        //     </select>;
        //     break;
        //     case ('file'):
        //     inputElement = <input className={inputClasses.join(' ')}
        //         {...props.elementConfig} onChange={props.changed} />; 
        //     break;


        /**            **  **  **  Template Defined Inputs     **  **  **  **      */
        case ('Textinputcomponent'):

            inputElement = <div className="col-md-4">
                <Textinputcomponent
                    inputLable={props.inputLable}
                    inputPlaceholder={props.placeholder}
                    inputName={props.id}
                    inputType={props.inputType}
                    inputValue={props.value}
                    inputDisabled={props.disabled}
                    inputCalssName={inputClasses.join(' ')}
                    inputID={props.inputID}
                    inputHandle={props.changed}
                />
                {validationError}
            </div>;
            break;

        case ('Textareacomponent'):

            inputElement = <div className="col-md-4">
                <Textareacomponent
                    textareaLable={props.inputLable}
                    textareaCalssName="form-control"
                    textareaPlaceholder={props.placeholder}
                    textareaName={props.id}
                    textareaRows="3"
                    textareaCols="2"
                    textareaID=""
                    textareaDisabled={false}
                    textareaValue={props.value}
                    textareaHandle={props.changed}
                />
                {validationError}
            </div>;
            break;



        case ('Reactselectcomponent'):

            inputElement = <div className="col-md-4">
                <Reactselectcomponent
                    // rcSelectCalss="form-control"
                    rcSelectCalss={inputClasses.join(' ')}
                    rcSelectLable={props.placeholder}
                    //rcSelectFunc={e => this.searchHandleChange(e)}
                    rcSelectFunc={props.changed}
                    rcSelectVal={props.value}
                    rsSelectID=""
                    rcSelectNam={props.id}
                    rcSelectList={props.list}
                />
                {validationError}
            </div>;
            break;


        case ('Radiocomponent'):

            inputElement = <div className="col-md-4">

                <label className="customLable">{props.valueType}</label>
                <Radiocomponent
                    radioClass={props.inputType}
                    radioName={props.valueType}
                    radioLable={props.labelname[0]}
                    radioDisabled={false}
                    radioValue={props.labelname[0]}
                    radioHandle={props.changed}

                />
                <Radiocomponent
                    radioClass={props.inputType}
                    radioName={props.valueType}
                    radioLable={props.labelname[1]}
                    radioDisabled={false}
                    radioValue={props.labelname[1]}
                    radioHandle={props.changed}

                />
                {validationError}
            </div>;
            break;

        default:
            inputElement = <input className={inputClasses.join(' ')}
                value={props.value} onChange={props.changed} />;
    }

    return (
        <div>
            {/* <label>{props.labelname}</label> */}
            {inputElement}
            {/* {validationError} */}
        </div>
    );
};

export default input;