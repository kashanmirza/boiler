import React, { Component } from 'react';
import Buttonscomponent from '../CustomComponent/Buttonscomponent';
import Input from '../CustomComponent/Input/Input';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import Useravatar from '../CustomComponent/Useravatar';
import Anchorcomponent from '../CustomComponent/Anchorcomponent';


var moment = require('moment');

class Membership extends Component {

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
            Name: {
                elementType: 'Textinputcomponent',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name',
                    labelname: 'Name',
                    disabled: false
                },
                value: 'Dr. Fahad khan',
                validation: {
                    required: false
                },
                valid: true,
                errorMsg: '',
                touched: false
            },
            Mobile: {
                elementType: 'Textinputcomponent',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Mobile #',
                    labelname: 'Mobile #',
                    disabled: false
                },
                value: '0300111111',
                validation: {
                    required: false
                },
                valid: true,
                errorMsg: '',
                touched: false
            },
            Address: {
                elementType: 'Textinputcomponent',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address',
                    labelname: 'Address',
                    disabled: false
                },
                value: 'ABC in Karachi',
                validation: {
                    required: false
                },
                valid: true,
                errorMsg: '',
                touched: false
            },
            MembershipNumber: {
                elementType: 'Textinputcomponent',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Membership Number',
                    labelname: 'Membership Number',
                    disabled: false
                },
                value: '92586700002585758',
                validation: {
                    required: false
                },
                valid: true,
                errorMsg: '',
                touched: false
            },
            Gender: {
                elementType: 'Radiocomponent',
                elementConfig: {
                    type: 'radio-inline',
                    placeholder: '',
                    labelname: ['Male','Female'],
                    disabled: false
                },
                value: 'Male',
                validation: {
                    required: false
                },
                valid: true,
                errorMsg: '',
                touched: false
            },
            UserName: {
                elementType: 'Textinputcomponent',
                elementConfig: {
                    type: 'text',
                    placeholder: 'User Name',
                    labelname: 'User Name',
                    disabled: false
                },
                value: 'FahadKhan',
                validation: {
                    required: false
                },
                valid: true,
                errorMsg: '',
                touched: false
            },
            Nationality: {
                elementType: 'Reactselectcomponent',
                elementConfig: {
                  options: [
                    { value: 'Pakistan', lable: 'Pakistan' },
                    { value: 'India', lable: 'India' },
                    { value: 'Afghanistan', lable: 'Afghanistan' },
                    { value: 'Bahrain', lable: 'Bahrain' },
                    { value: 'Belarus', lable: 'Belarus' },
                    { value: 'Benin', lable: 'Benin' },
                    { value: 'Cambodia', lable: 'Cambodia' },
                    { value: 'Ecuador', lable: 'Ecuador' },
                    { value: 'Finland', lable: 'Finland' },
                    { value: 'Egypt', lable: 'Egypt' },
                    { value: 'Guinea', lable: 'Guinea' },
                    { value: 'Grenada', lable: 'Grenada' },
                    { value: 'Guinea', lable: 'Guinea' },
                    { value: 'Georgia', lable: 'Georgia' },
                    { value: 'France', lable: 'France' },
                    { value: 'Iceland', lable: 'Iceland' },
                    { value: 'Jamaica', lable: 'Jamaica' },
                    { value: 'Laos', lable: 'Laos' },
                    { value: 'Latvia', lable: 'Latvia' },
                    { value: 'Maldives', lable: 'Maldives' },
                    { value: 'Namibia', lable: 'Namibia' },
                    { value: 'Oman', lable: 'Oman' },
                    { value: 'Mauritius', lable: 'Mauritius' },
                    { value: 'Montenegro', lable: 'Montenegro' }

                  ],
                  labelname: 'Nationality',
                  placeholder: 'Nationality',
                },
                validation: {},
                value: 'Pakistan',
                valid: true
              },
              Status: {
                elementType: 'Textinputcomponent',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Status',
                    labelname: 'Status',
                    disabled: true
                },
                value: 'Active',
                validation: {
                    required: false
                },
                valid: true,
                errorMsg: '',
                touched: false
            },
            Comments: {
                elementType: 'Textareacomponent',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Comments',
                    labelname: 'Comments',
                    disabled: true
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true,
                errorMsg: '',
                touched: false
            },
            City: {
                elementType: 'Reactselectcomponent',
                elementConfig: {
                  options: [
                    { value: 'Karachi', lable: 'Karachi' },
                    { value: 'India', lable: 'India' },
                    { value: 'Afghanistan', lable: 'Afghanistan' },
                    { value: 'Bahrain', lable: 'Bahrain' },
                    { value: 'Belarus', lable: 'Belarus' },
                    { value: 'Benin', lable: 'Benin' },
                    { value: 'Cambodia', lable: 'Cambodia' },
                    { value: 'Ecuador', lable: 'Ecuador' },
                    { value: 'Finland', lable: 'Finland' },
                    { value: 'Egypt', lable: 'Egypt' },
                    { value: 'Guinea', lable: 'Guinea' },
                    { value: 'Grenada', lable: 'Grenada' },
                    { value: 'Guinea', lable: 'Guinea' },
                    { value: 'Georgia', lable: 'Georgia' },
                    { value: 'France', lable: 'France' },
                    { value: 'Iceland', lable: 'Iceland' },
                    { value: 'Jamaica', lable: 'Jamaica' },
                    { value: 'Laos', lable: 'Laos' },
                    { value: 'Latvia', lable: 'Latvia' },
                    { value: 'Maldives', lable: 'Maldives' },
                    { value: 'Namibia', lable: 'Namibia' },
                    { value: 'Oman', lable: 'Oman' },
                    { value: 'Mauritius', lable: 'Mauritius' },
                    { value: 'Montenegro', lable: 'Montenegro' }

                  ],
                  labelname: 'Nationality',
                  placeholder: 'Nationality',
                },
                validation: {},
                value: 'Karachi',
                valid: true
              },
              Email: {
                elementType: 'Textinputcomponent',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email',
                    labelname: 'Email',
                    disabled: false
                },
                value: 'Fahad@AKU.com',
                validation: {
                    required: false
                },
                valid: true,
                errorMsg: '',
                touched: false
            },  
            NIC: {
                elementType: 'Textinputcomponent',
                elementConfig: {
                    type: 'text',
                    placeholder: 'NIC #',
                    labelname: 'NIC #',
                    disabled: false
                },
                value: '42101-19121475-3',
                validation: {
                    required: false
                },
                valid: true,
                errorMsg: '',
                touched: false
            },
            Passport: {
                elementType: 'Textinputcomponent',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Passport',
                    labelname: 'Passport',
                    disabled: false
                },
                value: '457545855',
                validation: {
                    required: false
                },
                valid: true,
                errorMsg: '',
                touched: false
            },
            RegistrationType:{
                elementType: 'Reactselectcomponent',
                elementConfig: {
                  options: [
                    { value: 'Employee', lable: 'Employee' },
                    { value: 'Family', lable: 'Family' }
                  ],
                  labelname: 'Registration Type',
                  placeholder: 'RegistrationType',
                },
                validation: {},
                value: 'Employee',
                valid: true
              },
              MemeberShipName:{
                elementType: 'Reactselectcomponent',
                elementConfig: {
                  options: [
                    { value: 'Gold', lable: 'Gold' },
                    { value: 'Platinum', lable: 'Platinum' },
                    { value: 'Premium', lable: 'Premium' },
                    { value: 'LifeTime', lable: 'LifeTime' },
                    { value: 'Family', lable: 'Family' }
                  ],
                  labelname: 'MemeberShip Name',
                  placeholder: 'MemeberShip Name',
                },
                validation: {},
                value: 'Employee',
                valid: true
              },
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

        // if (rules.required) {
        //     isValid = value.trim() !== '' && isValid;
        //     if (!isValid && errorMsg == null) {
        //         errorMsg = 'Field cannot be empty';
        //     }
        // }

        // if (rules.minLength) {
        //     isValid = value.trim().length >= rules.minLength && isValid;
        //     if (!isValid && errorMsg == null) {
        //         errorMsg = 'Minimum Length must be ' + rules.minLength;
        //     }
        // }

        // if (rules.maxLength) {
        //     isValid = value.trim().length <= rules.maxLength && isValid;
        //     if (!isValid && errorMsg == null) {
        //         errorMsg = 'Maximum Length must be ' + rules.maxLength;
        //     }
        // }

        // if (rules.emailRegex) {
        //     isValid = (rules.emailRegex.test(value.trim())) && isValid;
        //     if (!isValid && errorMsg == null) {
        //         errorMsg = 'Email must be valid'
        //     }
        // }
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
        let dataTable = null;
        let frm = null;
        let content = null;
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        function avatarFormatter(params, row) {
            return <Useravatar
              Useravatarname={row.facilityName}
              rowData={row} />
          }
      
          function anchorFormatter(cell, row) {
            return <Anchorcomponent
              anchotDisplayName={row.facilityName}
              rowData={row}
            // invokeAnchorButtonhandlar={this.viewRow.bind(this)}
            />
          }

        let data =   [{
            
            'id':1,
            'facilityName':'Pool,Cricket Ground,Gym',
            'days': 'Monday',
            'fromTime': '12:00 pm',
            'toTime': '3:00 pm',
           
        },
    
        {
            'id':2,
            'facilityName':'Pool,Cricket Ground,Gym',
            'days': 'Tuesday',
            'fromTime': '5:00 pm',
            'toTime': '7:00 pm',
        },
    
        {
            'id':3,
            'facilityName':'Pool,Cricket Ground,Gym',
            'days': 'Wednesday',
            'fromTime': '12:00 pm',
            'toTime': '3:00 pm',
        },
    
        {
            'id':4,
            'facilityName':'Pool,Cricket Ground,Gym',
            'days': 'Thursday',
            'fromTime': '10:00 pm',
            'toTime': '11:00 pm',
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
         <TableHeaderColumn width="50" isKey dataField='id'>ID</TableHeaderColumn> 
        <TableHeaderColumn width="50" dataFormat={avatarFormatter.bind(this)} dataField='facilityName'></TableHeaderColumn>
        <TableHeaderColumn dataSort={true} dataFormat={anchorFormatter.bind(this)} dataField='facilityName'>Facility Name</TableHeaderColumn>
        <TableHeaderColumn dataField='days'>days</TableHeaderColumn>
        <TableHeaderColumn dataField='fromTime'>From Time</TableHeaderColumn>
        <TableHeaderColumn dataField='toTime'>toTime</TableHeaderColumn>
      </BootstrapTable></div>

        frm = (
            <div>
                <form>
                    {formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            valueType={formElement.id}
                            placeholder={formElement.config.elementConfig.placeholder}
                            id={formElement.id}
                            labelname={formElement.config.elementConfig.labelname}
                            inputLable={formElement.config.elementConfig.labelname}
                            inputType={formElement.config.elementConfig.type}
                            disabled={formElement.config.elementConfig.disabled}
                            inputID=""
                            list={formElement.config.elementConfig.options}
                            elementType={formElement.config.elementType}
                            value={formElement.config.value}
                            errorMsg={formElement.config.errorMsg}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangeHandler(event, formElement.id)}></Input>
                    ))}

                </form>
            </div>
        )
        

        content = <div className="clearfix">
             <div className="col-md-12">
          
          {/* <Buttonscomponent
            buttonFunction={() => this.props.next("2")}
            btnType="button"
            btnCalss="btn btn-success btnRight"
            btnTitle="Next"
          /> */}
        </div>
        {frm}
       

      </div>

        return (
            <div>
                 <div className="stepwizard">
          <div className="stepwizard-row">
            <div className="stepwizard-step">
              <button type="button" className="btn btn-primary btn-circle" style={circleCSS} onClick={() => this.props.presentScreen("1")}><i class="fa icon-user tabs-icon"></i></button>
              <p>Profile</p>
            </div>
            <div className="stepwizard-step">
              <button type="button" className="btn btn-default btn-circle" style={circleCSS} onClick={() => this.props.presentScreen("2")}><i class="fa fa fa-paragraph tabs-icon"></i></button>
              <p>Membership/Event</p>
            </div>
            <div className="stepwizard-step">
              <button type="button" className="btn btn-default btn-circle" style={circleCSS} onClick={() => this.props.presentScreen("3")}><i class="fa fa fa-file-text-o tabs-icon"></i></button>
              <p>Package Details</p>
            </div>
            <div className="stepwizard-step">
              <button type="button" className="btn btn-default btn-circle" style={circleCSS} onClick={() => this.props.presentScreen("4")}><i class="fa fa-users tabs-icon"></i></button>
              <p>Family</p>
            </div>
            <div className="stepwizard-step">
              <button type="button" className="btn btn-default btn-circle" style={circleCSS} onClick={() => this.props.presentScreen("5")}><i class="fa fa-money tabs-icon"></i></button>
              <p>Payments</p>
            </div>
            <div className="stepwizard-step">
              <button type="button" className="btn btn-default btn-circle" style={circleCSS} onClick={() => this.props.presentScreen("6")} ><i class="fa fa fa-file-text tabs-icon"></i></button>
              <p>Activity Log</p>
            </div>
          </div>
        </div>
                <div className="col-md-12">
                    <div className="">
                        {content}
                        {dataTable}
                    </div>
                </div>
            </div>
        )
    }
}


export default Membership;