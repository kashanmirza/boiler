import React, { Component } from 'react';
import Radiocomponent from '../CustomComponent/Radiocomponent';
import Checkboxcomponent from '../CustomComponent/Checkboxcomponent';
import Reactselectcomponent from '../CustomComponent/Reactselectcomponent';
import { Checkbox, Radio, RadioGroup } from 'react-icheck';
import Buttonscomponent from '../CustomComponent/Buttonscomponent';
import Input from '../CustomComponent/Input/Input';
import MemberShip from './MemberShip';
import MemberShip2 from './MemberShip2';
import MemberShip3 from './MemberShip3';
import MemberShip4 from './MemberShip4';
import MemberShip5 from './MemberShip5';
import MemberShip6 from './MemberShip6';

class MembershipManagement extends Component {

    state = {
        checked: [],
        expanded: [],
        nodes: [],
        mPassword: '',
        mPasswordError: '',
        mFirstName: '',
        mFirstNameError: '',
        mLastNameError: '',
        mLastName: '',
        reloadResult: false,
        mCheckedError: '',
        formIsValid: false,
        orderForm: {
            FirstName: {
                elementType: 'Textinputcomponent',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name',
                    labelname: 'First Name',
                    disabled: false
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 10
                },
                valid: false,
                errorMsg: '',
                touched: false
            },
            LastName: {
                elementType: 'Textinputcomponent',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name',
                    labelname: 'Last Name',
                    disabled: false
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 5
                },
                valid: false,
                errorMsg: '',
                touched: false
            },
            Password: {
                elementType: 'Textinputcomponent',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    labelname: 'Password',
                    disabled: false
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 8
                },
                valid: false,
                errorMsg: '',
                touched: false
            },
        },
        step1: true,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
        step6: false

    }

    step3Function() {
        this.setState({
            step1: false,
            step2: false,
            step3: false,
        })
    }

    // back1Function() {
    //     this.setState({
    //         step1: true,
    //         step2: false,
    //         step3: false,
    //     })
    //     console.log('call func');
    // }

    inputChangeHandler = (event, inputIdentifier) => {

        const updateOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...updateOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;

        // if (this.props.status == Enums.USER_AND_ROLE_MANAGEMENT_STATUS.PENDING) {

        //     updatedFormElement.disabled = true;
        // }

        var rules = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

        updatedFormElement.valid = rules.isValid;
        updatedFormElement.errorMsg = rules.errorMsg;
        //updatedFormElement.valid = true;
        updatedFormElement.touched = true;
        updateOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updateOrderForm) {
            formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ orderForm: updateOrderForm, formIsValid: formIsValid });
    }

    checkValidity(value, rules) {
        let isValid = true;
        let errorMsg = null;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
            if (!isValid && errorMsg == null) {
                errorMsg = 'Field cannot be empty';
            }
        }

        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
            if (!isValid && errorMsg == null) {
                errorMsg = 'Minimum Length must be ' + rules.minLength;
            }
        }

        if (rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
            if (!isValid && errorMsg == null) {
                errorMsg = 'Maximum Length must be ' + rules.maxLength;
            }
        }

        if (rules.emailRegex) {
            isValid = (rules.emailRegex.test(value.trim())) && isValid;
            if (!isValid && errorMsg == null) {
                errorMsg = 'Email must be valid'
            }
        }
        return {
            isValid: isValid,
            errorMsg: errorMsg
        };
    }

    presentScreen = (formNumber) =>{
        if (formNumber == "1") {

            this.setState({ step1: true, step2: false, step3: false, step4: false, step5: false, step6: false });
        }
        else if (formNumber == "2") {

            this.setState({ step1: false, step2: true, step3: false, step4: false, step5: false, step6: false });
        }
        else if (formNumber == "3") {

            this.setState({ step1: false, step2: false, step3: true, step4: false, step5: false, step6: false });
        }
        else if (formNumber == "4") {

            this.setState({ step1: false, step2: false, step3: false, step4: true, step5: false, step6: false });
        }
        else if (formNumber == "5") {

            this.setState({ step1: false, step2: false, step3: false, step4: false, step5: true, step6: false });
        }

        else if (formNumber == "6") {

            this.setState({ step1: false, step2: false, step3: false, step4: false, step5: false, step6: true });
        }
    }

    NextFunctionality = (formNumber) => {

        if (formNumber == "1") {

            this.setState({ step1: true, step2: false, step3: false, step4: false, step5: false, step6: false });
        }
        else if (formNumber == "2") {

            this.setState({ step1: false, step2: true, step3: false, step4: false, step5: false, step6: false });
        }
        else if (formNumber == "3") {

            this.setState({ step1: false, step2: false, step3: true, step4: false, step5: false, step6: false });
        }
        else if (formNumber == "4") {

            this.setState({ step1: false, step2: false, step3: false, step4: true, step5: false, step6: false });
        }
        else if (formNumber == "5") {

            this.setState({ step1: false, step2: false, step3: false, step4: false, step5: true, step6: false });
        }

        else if (formNumber == "6") {

            this.setState({ step1: false, step2: false, step3: false, step4: false, step5: false, step6: true });
        }
    }

    backFunction(formNumber) {

        if (formNumber == "2") {

            this.setState({ step1: true, step2: false, step3: false, step4: false, step5: false, step6: false });
        }
        else if (formNumber == "3") {

            this.setState({ step1: false, step2: true, step3: false, step4: false, step5: false, step6: false });
        }
        else if (formNumber == "4") {

            this.setState({ step1: false, step2: false, step3: true, step4: false, step5: false, step6: false });
        }
        else if (formNumber == "5") {

            this.setState({ step1: false, step2: false, step3: false, step4: true, step5: false, step6: false });
        }

        else if (formNumber == "6") {

            this.setState({ step1: false, step2: false, step3: false, step4: false, step5: true, step6: false });
        }
    }

    render() {

        let buttons = null;
        buttons =
            <div className="col-md-12">

                <Buttonscomponent
                    buttonFunction={() => this.cancelFunc()}
                    btnType="button"
                    btnCalss="btn btn-default btnRight"
                    btnTitle="Cancel"
                />
                <Buttonscomponent
                    buttonFunction={() => this.addRoles()}
                    btnType="button"
                    btnCalss="btn btn-success btnRight"
                    btnTitle="Save"
                // buttonDisabled = {!this.state.formIsValid}
                />
            </div>



        return (
            <div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="overviewBox clearfix">

                            {this.state.step1 ?
                                <div>
                                    <h2>Profile</h2>
                                    <MemberShip
                                        next={(formNumber) => this.NextFunctionality(formNumber)}
                                        presentScreen = {(formNumber) => this.presentScreen(formNumber)}
                                    ></MemberShip> </div> : null}
                            {this.state.step2 ?
                                <div>
                                    <h2>Membership/Event Details</h2>
                                    <MemberShip2
                                        back1={(formNumber) => this.backFunction(formNumber)}
                                        next={(formNumber) => this.NextFunctionality(formNumber)}
                                        presentScreen = {(formNumber) => this.presentScreen(formNumber)}
                                    ></MemberShip2>

                                </div> : null}

                            {this.state.step3 ?
                                <div>
                                    <h2>Package Details</h2>
                                    <MemberShip3
                                        back1={(formNumber) => this.backFunction(formNumber)}
                                        next={(formNumber) => this.NextFunctionality(formNumber)}
                                        presentScreen = {(formNumber) => this.presentScreen(formNumber)}
                                    ></MemberShip3>
                                </div>
                                :
                                null}

                            {this.state.step4 ?
                                <div>
                                    <h2>Family</h2>
                                    <MemberShip4
                                        back1={(formNumber) => this.backFunction(formNumber)}
                                        next={(formNumber) => this.NextFunctionality(formNumber)}
                                        presentScreen = {(formNumber) => this.presentScreen(formNumber)}
                                    ></MemberShip4>
                                </div>
                                :
                                null}

                            {this.state.step5 ?
                                <div>
                                    <h2>Payments</h2>
                                    <MemberShip5
                                        back1={(formNumber) => this.backFunction(formNumber)}
                                        next={(formNumber) => this.NextFunctionality(formNumber)}
                                        presentScreen = {(formNumber) => this.presentScreen(formNumber)}
                                    ></MemberShip5>
                                </div>
                                :
                                null}


                            {this.state.step6 ?
                                <div>
                                    <h2>Activity Logs</h2>
                                    <MemberShip6
                                        back1={(formNumber) => this.backFunction(formNumber)}
                                        presentScreen = {(formNumber) => this.presentScreen(formNumber)}
                                    ></MemberShip6>
                                </div>
                                :
                                null}

                        </div>
                    </div>
                </div>
                {/* <div className="col-md-12">
                    <div className="customCollapse">
                    <MemberShip></MemberShip>
                    {buttons}
                    </div>
                </div> */}
            </div>
        )
    }
}


export default MembershipManagement;