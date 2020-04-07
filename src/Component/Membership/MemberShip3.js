import React, { Component } from 'react';
import Radiocomponent from '../CustomComponent/Radiocomponent';
import Checkboxcomponent from '../CustomComponent/Checkboxcomponent';
import Reactselectcomponent from '../CustomComponent/Reactselectcomponent';
import { Checkbox, Radio, RadioGroup } from 'react-icheck';
import Buttonscomponent from '../CustomComponent/Buttonscomponent';
import Input from '../CustomComponent/Input/Input';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import Useravatar from '../CustomComponent/Useravatar';
import Anchorcomponent from '../CustomComponent/Anchorcomponent';

var moment = require('moment');

class MemberShip3 extends Component {

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
            }
           
        },
        step1: true,
        step2: false,
        step3: false  

    }

    step3Function() {
        this.setState({
          step1: false,
          step2: false,
          step3: false,
        })
      }
    
      back1Function() {
        this.setState({
          step1: true,
          step2: false,
          step3: false,
        })
        console.log('call func');
      }
    
      back2Function() {
        this.setState({
          step1: false,
          step2: true,
          step3: false,
        })
      }

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


    render() {

        const circleCSS = {
            width: 'auto',
            height: '30px',
            textAlign: 'center',
            padding: '6px 10px',
            fontSize: '12px',
            lineHeight: '1.428571429',
            borderRadius: '15px',
            border: 'none',
            backgroundColor: '#ebeaea !important'
        };
        let frm = null;
        let content = null;
        const formElementsArray = [];
        let dataTable = null;
        let dataTable2 = null;

        // for (let key in this.state.orderForm) {
        //     formElementsArray.push({
        //         id: key,
        //         config: this.state.orderForm[key]
        //     });
        // }

        // frm = (
        //     <div>
        //         <form>
        //             {formElementsArray.map(formElement => (
        //                 <Input
        //                     key={formElement.id}
        //                     valueType={formElement.id}
        //                     placeholder={formElement.config.elementConfig.placeholder}
        //                     id={formElement.id}
        //                     labelname={formElement.config.elementConfig.labelname}
        //                     inputLable={formElement.config.elementConfig.labelname}
        //                     inputType={formElement.config.elementConfig.type}
        //                     disabled={formElement.config.elementConfig.disabled}
        //                     inputID=""
        //                     elementType={formElement.config.elementType}
        //                     value={formElement.config.value}
        //                     errorMsg={formElement.config.errorMsg}
        //                     invalid={!formElement.config.valid}
        //                     shouldValidate={formElement.config.validation}
        //                     touched={formElement.config.touched}
        //                     changed={(event) => this.inputChangeHandler(event, formElement.id)}></Input>
        //             ))}

        //         </form>
        //     </div>
        // )
        
        let data = [{

           
            'status': 'Acive',
            'name': 'Management Package',
            'startdate': '01/01/2018',
            'enddate': '20/12/2018',
            'facilities' : 'Gaming',
            'days' : 'Friday, Sunday'

        },

        {
            
            'status': 'Acive',
            'name': 'Common Package',
            'startdate': '20/01/2018',
            'enddate': '20/12/2019',
            'facilities' : 'Lounge, Pool',
            'days' : 'Monday, Wednesday'
        },

        {
            
            'status': 'Expired',
            'name': 'Ultimate Package',
            'startdate': '01/01/2017',
            'enddate': '20/6/2018',
            'facilities' : 'Gaming',
            'days' : 'Sunday'
        }];

        let data1 = [{

            
            'status': 'Acive',
            'name': 'Family Package',
            'membername': 'Ali',
            'startdate': '20/01/2018',
            'enddate': '20/12/2019',
            'facilities' : 'Lounge, Tennis',
            'days' : 'Monday, Wednesday'

        },

        {
            
            'status': 'Acive',
            'name': 'Family Package',
            'membername': 'Farah Khan',
            'startdate': '01/01/2018',
            'enddate': '20/12/2019',
            'facilities' : 'Gym',
            'days' : 'Friday, Thursday'
        },

        {
            
            'status': 'Acive',
            'name': 'Family Package',
            'membername': 'Imran Khan',
            'startdate': '01/01/2017',
            'enddate': '20/6/2019',
            'facilities' : 'Boxing',
            'days' : 'Sunday'
        }];

        dataTable = <div className="col-md-12"><BootstrapTable
            data={data}
            pagination={true}
            search={true}
            containerClass='tableContainer'
            headerContainerClass='tableHeader'
            bodyContainerClass='bodyContainer'
            bordered={false}
            striped
            hover>
              
            <TableHeaderColumn  isKey dataField='name'>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='status'>Status</TableHeaderColumn>
            <TableHeaderColumn dataField='startdate'>Start Date</TableHeaderColumn>
            <TableHeaderColumn dataField='enddate'>End Date</TableHeaderColumn>
            <TableHeaderColumn dataField='facilities'>Facilites</TableHeaderColumn>
            <TableHeaderColumn dataField='days'>Days</TableHeaderColumn>
        </BootstrapTable></div>


        dataTable2 = <div className="col-md-12"><BootstrapTable
            data={data1}
            pagination={true}
            search={true}
            containerClass='tableContainer'
            headerContainerClass='tableHeader'
            bodyContainerClass='bodyContainer'
            bordered={false}
            striped
            hover>
            
            <TableHeaderColumn isKey dataField='name'>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='status'>Status</TableHeaderColumn>
            <TableHeaderColumn dataField='membername'>Member Name</TableHeaderColumn>
            <TableHeaderColumn dataField='startdate'>Start Date</TableHeaderColumn>
            <TableHeaderColumn dataField='enddate'>End Date</TableHeaderColumn>
            <TableHeaderColumn dataField='facilities'>Facilites</TableHeaderColumn>
            <TableHeaderColumn dataField='days'>Days</TableHeaderColumn>
        </BootstrapTable></div>


        content = <div className="clearfix">
        {/* {frm} */}
        <div className="col-md-12">
        {/* <Buttonscomponent
                    buttonFunction={() => this.props.next("4")}
                    btnType="button"
                    btnCalss="btn btn-default btnRight"
                    btnTitle="Next"
                />
                <Buttonscomponent
                    buttonFunction={() => this.props.back1("3")}
                    btnType="button"
                    btnCalss="btn btn-default btnRight"
                    btnTitle="Back"
                /> */}
        </div>
        <p><h3>Employee Package Details</h3></p>
            {dataTable}

            <p><h3>Family Package Details</h3></p>
            {dataTable2}
        

      </div>

        return (
            <div>
                 <div className="stepwizard">
          <div className="stepwizard-row">
            <div className="stepwizard-step">
              <button type="button" className="btn btn-default btn-circle" style={circleCSS} onClick={() => this.props.presentScreen("1")}>Profile</button>
              <p>Profile</p>
            </div>
            <div className="stepwizard-step">
              <button type="button" className="btn btn-default btn-circle" style={circleCSS} onClick={() => this.props.presentScreen("2")}>Membership/Event Details</button>
              <p>Membership/Event Details</p>
            </div>
            <div className="stepwizard-step">
              <button type="button" className="btn btn-primary btn-circle" style={circleCSS} onClick={() => this.props.presentScreen("3")}>Package Details</button>
              <p>Package Details</p>
            </div>

            <div className="stepwizard-step">
              <button type="button" className="btn btn-default btn-circle" style={circleCSS} onClick={() => this.props.presentScreen("4")} >Family</button>
              <p>Family</p>
            </div>
            <div className="stepwizard-step">
              <button type="button" className="btn btn-default btn-circle" style={circleCSS} onClick={() => this.props.presentScreen("5")}>Payments</button>
              <p>Payments</p>
            </div>
            <div className="stepwizard-step">
              <button type="button" className="btn btn-default btn-circle" style={circleCSS} onClick={() => this.props.presentScreen("6")} >Activity Log</button>
              <p>Activity Log</p>
            </div>
          </div>
        </div>
                <div className="col-md-12">
                    <div className="">
                        {/* <h1>MemberShip Management
              <a href="javascript:;" onClick={() => this.addAreaCollapse()}>
                                <i className={this.state.addArea === false ? 'icon-arrow-left' : 'icon-arrow-down'}></i></a></h1> */}
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}


export default MemberShip3;