import React, { Component } from 'react';
import Buttonscomponent from '../CustomComponent/Buttonscomponent';
import Textinputcomponent from '../CustomComponent/Textinputcomponent';
// import Reactselectcomponent from '../CustomComponent/Reactselectcomponent';
// import DateTimePicker from 'react-datetime-picker';
// import TimePicker from 'react-time-picker';
import Textareacomponent from '../CustomComponent/Textareacomponent';
import { connect } from 'react-redux';
// import { GetAllPermission, UpdateRolePermission,GetPermissionById,ClearState,ApproveRole,RejectRole } from '../../store/Actions/role';
import { ClearState, GetActiveRoles, ApproveUser, RejectUser, UpdateUserPermission } from '../../store/Actions/userManagement';
import Alertmesgcomponent from '../CustomComponent/Alertmesgcomponent';
import Enums from '../../Common/Enum';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import Input from '../CustomComponent/Input/Input';

import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTableGrid from '../CustomComponent/Grid/BootstrapTableGrid';


const { SearchBar } = Search;
class EditUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
      msg: '',
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
      }

    }
  }

  componentWillMount() {
    this.props.onClearState();
  }

  componentDidMount() {
    this.props.onGetActiveRoles();
    if (this.props.id !== null) {
      this.setState({
        checked: this.props.checked
      })
      this.FillTextBoxesValues();
    }
  }

  FillTextBoxesValues = () => {

    if (this.props.properties != null) {
      const updateOrderForm = {
        ...this.state.orderForm
      }

      const updatedFormElement = {
        ...updateOrderForm
      };

      //console.log(orders[0].name);
      updatedFormElement.FirstName.value = this.props.properties.firstName;


      updatedFormElement.LastName.value = this.props.properties.lastName;

      updatedFormElement.Password.value = this.props.properties.password;


      if (this.props.status == Enums.USER_AND_ROLE_MANAGEMENT_STATUS.PENDING) {
        updatedFormElement.FirstName.elementConfig.disabled = true;
        updatedFormElement.LastName.elementConfig.disabled = true;
        updatedFormElement.Password.elementConfig.disabled = true;

      }
      updatedFormElement.FirstName.valid = true
      updatedFormElement.LastName.valid = true;
      updatedFormElement.Password.valid = true;

      // this.setState({ orderForm: updatedFormElement,formIsValid:true });
      this.setState({ orderForm: updatedFormElement, formIsValid: true });
    }
  }

  EmptyTextBoxesValues = () => {
    const updateOrderForm = {
      ...this.state.orderForm
    }

    const updatedFormElement = {
      ...updateOrderForm
    };

    //console.log(orders[0].name);
    updatedFormElement.FirstName.value = '';
    updatedFormElement.FirstName.valid = true

    updatedFormElement.LastName.value = '';
    updatedFormElement.LastName.valid = true;

    updatedFormElement.Password.value = '';
    updatedFormElement.Password.valid = true;

    // this.setState({ orderForm: updatedFormElement,formIsValid:true });
    this.setState({ orderForm: updatedFormElement, formIsValid: false });
  }

  approveRoles = () => {

    if (this.state.orderForm.FirstName.value === "") {
      this.setState({ mFirstNameError: 'please enter name' })
    }
    else {
      this.setState({
        mFirstNameError: false
      })
    }
    if (this.state.orderForm.LastName.value === "") {
      this.setState({ mLastNameError: 'please enter last name' })
    }
    else {
      this.setState({
        mLastNameError: false
      })
    }


    if (this.state.orderForm.Password.value === "") {
      this.setState({ mPasswordError: 'please enter password' })
    }
    else {
      this.setState({
        mPasswordError: false
      })
    }

    if (this.state.checked.length === 0) {
      this.setState({ mCheckedError: 'please select atleast one group' })
    }
    else {
      this.setState({
        mCheckedError: false
      })
    }


    if (!(this.state.orderForm.FirstName.value === "") && !(this.state.orderForm.LastName.value === "") && !(this.state.orderForm.Password.value === "") && !(this.state.checked.length === 0)) {

      this.portlateReload();
      const Permissions = {
        Permission: {
          Id: this.props.id,
          Status: Enums.USER_AND_ROLE_MANAGEMENT_STATUS.APPROVED,
          CreatedBy: 'approveUser'
        }

      }

      this.props.onApproveRole(Permissions)
        .then((res) => {

          if (this.props.error == undefined || this.props.error == '' || this.props.error == null) {
            this.setState({ checked: [], msg: 'Record has been approved successfully' });
            this.EmptyTextBoxesValues();
          }
        })
        .catch(err => {
          console.log('ERROR:' + err);
        });
    }
  }

  rejectRoles = () => {

    if (this.state.orderForm.FirstName.value === "") {
      this.setState({ mFirstNameError: 'please enter name' })
    }
    else {
      this.setState({
        mFirstNameError: false
      })
    }
    if (this.state.orderForm.LastName.value === "") {
      this.setState({ mLastNameError: 'please enter last name' })
    }
    else {
      this.setState({
        mLastNameError: false
      })
    }


    if (this.state.orderForm.Password.value === "") {
      this.setState({ mPasswordError: 'please enter password' })
    }
    else {
      this.setState({
        mPasswordError: false
      })
    }

    if (this.state.checked.length === 0) {
      this.setState({ mCheckedError: 'please select atleast one group' })
    }
    else {
      this.setState({
        mCheckedError: false
      })
    }

    if (!(this.state.orderForm.FirstName.value === "") && !(this.state.orderForm.LastName.value === "") && !(this.state.orderForm.Password.value === "") && !(this.state.checked.length === 0)) {

      //this.portlateReload();
      const Permissions = {
        Permission: {
          Id: this.props.id,
          Status: Enums.USER_AND_ROLE_MANAGEMENT_STATUS.REJECTED,
          CreatedBy: 'rejectUser'
        }

      }

      this.props.onRejectRole(Permissions)
        .then((res) => {

          if (this.props.error == undefined || this.props.error == '' || this.props.error == null) {
            this.setState({ checked: [], msg: 'Record has been rejected successfully' });
            this.EmptyTextBoxesValues();
          }
        })
        .catch(err => {
          console.log('ERROR:' + err);
        });
    }
  }


  updateRoles = () => {

    if (this.state.orderForm.FirstName.value === "") {
      this.setState({ mFirstNameError: 'please enter name' })
    }
    else {
      this.setState({
        mFirstNameError: false
      })
    }
    if (this.state.orderForm.LastName.value === "") {
      this.setState({ mLastNameError: 'please enter last name' })
    }
    else {
      this.setState({
        mLastNameError: false
      })
    }


    if (this.state.orderForm.Password.value === "") {
      this.setState({ mPasswordError: 'please enter password' })
    }
    else {
      this.setState({
        mPasswordError: false
      })
    }

    if (this.state.checked.length === 0) {
      this.setState({ mCheckedError: 'please select atleast one group' })
    }
    else {
      this.setState({
        mCheckedError: false
      })
    }

    if (!(this.state.orderForm.FirstName.value === "") && !(this.state.orderForm.LastName.value === "") && !(this.state.orderForm.Password.value === "") && !(this.state.checked.length === 0)) {

      this.portlateReload();
      const data = {
        userManagement: {
          FirstName: this.state.orderForm.FirstName.value,
          LastName: this.state.orderForm.LastName.value,
          Password: this.state.orderForm.Password.value
        },
        Permissions: this.state.checked,
        Status: Enums.USER_AND_ROLE_MANAGEMENT_STATUS.PENDING,
        CreatedBy : 'updateUser' 
      }

      this.props.onUpdateRolePermission(data)
        .then((res) => {

          if (this.props.error == undefined || this.props.error == '' || this.props.error == null) {
            this.setState({ checked: [], msg: 'Record has been updated successfully' });
            this.EmptyTextBoxesValues();
          }
        })
        .catch(err => {
          console.log('ERROR:' + err);
        });
    }
  }

  addHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  cancelFunc() {
    // this.setState({
    // })

    this.props.history.push('/UserManagement/SearchUser');
  }

  ApproveFunc() {
    // this.setState({
    // })
    //this.props.history.push('/Role/SearchRole');
  }


  RejectFunc() {
    // this.setState({
    // })
    //this.props.history.push('/Role/SearchRole');
  }

  handleOnSelect = (row, isSelect, e) => {
    
    var arrays = this.state.checked;
    if (isSelect) {
      arrays.push(row.id);
      console.log(arrays);
    }
    else {
      arrays = this.arrayRemove(arrays, row.id);
      console.log(arrays);
    }

    this.setState({ checked: arrays });
  }

  arrayRemove = (arr, value) => {

    return arr.filter(function (ele) {
      return ele != value;
    });

  }

  handleOnSelectAll = (isSelect, rows) => {
    debugger;
    if (isSelect) {
      var arrays = this.state.checked;
      for (let i = 0; i < this.props.activeRoles.length; i++) {
        arrays.push(this.props.activeRoles[i].id);
      }
      this.setState({ checked: arrays });
      return this.props.activeRoles.map(row => row.id);
    } else {
      this.setState({ checked: [] });
      return [];
    }

  }

  portlateReload() {
    this.setState({ reloadResult: !this.state.reloadResult });
    setTimeout(function () {
      this.setState({ reloadResult: false });
    }.bind(this), 500)
  }


  inputChangeHandler = (event, inputIdentifier) => {

    const updateOrderForm = {
      ...this.state.orderForm
    }

    const updatedFormElement = {
      ...updateOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;

    if (this.props.status == Enums.USER_AND_ROLE_MANAGEMENT_STATUS.PENDING) {

      updatedFormElement.disabled = true;
    }

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
    //return isValid;
  }



  render() {

    const errorcss = {
      bottom: '250px',
    };
    const columns = [{
      dataField: 'id',
      text: 'ID'
    }, {
      dataField: 'roleName',
      text: 'First Name'
    }, {
      dataField: 'description',
      text: 'Last Name'
    }];

    const formElementsArray = [];
    const reload = this.state.reloadResult ? 'portletMask' : 'data-hide';
    let table = null;
    let content = null;
    let successMsg = null;
    let errorMsg = null;
    let buttons = null;
    let result = null;
    let approveRejectButton = null;
    let saveButton = null;


    if (this.props.activeRoles != null && this.props.status == Enums.USER_AND_ROLE_MANAGEMENT_STATUS.PENDING) {
     
     result = this.props.activeRoles.map(a => a.id);
  debugger;
      table = <BootstrapTableGrid
      paginationSize = {5} //Default is 5 
      dataCount = {this.props.activeRoles.length}
      dataContainsPerPage = {[2]}
      handleOnSelect = {this.handleOnSelect}
      handleOnSelectAll = {this.handleOnSelectAll}
      mode = 'checkbox'
      keyOfTable = "id"
      columns = {columns}
      data = {this.props.activeRoles}
      Page = "EditUser"
      checked = {this.props.checked}
      result = {result}
      />

    }
    else if (this.props.activeRoles !== null && (this.props.status == Enums.USER_AND_ROLE_MANAGEMENT_STATUS.APPROVED || this.props.status == Enums.USER_AND_ROLE_MANAGEMENT_STATUS.REJECTED)) {

      table = <BootstrapTableGrid
      paginationSize = {5} //Default is 5 
      dataCount = {this.props.activeRoles.length}
      dataContainsPerPage = {[2]}
      handleOnSelect = {this.handleOnSelect}
      handleOnSelectAll = {this.handleOnSelectAll}
      mode = 'checkbox'
      keyOfTable = "id"
      columns = {columns}
      data = {this.props.activeRoles}
      Page = "EditUserSave"
      checked = {this.state.checked}
      result = {null}
      />

    }
    
    if (this.props.id != null) {
      if (this.props.status == Enums.USER_AND_ROLE_MANAGEMENT_STATUS.PENDING) {
        approveRejectButton = <div>
          <Buttonscomponent
            buttonFunction={() => this.rejectRoles()}
            btnType="button"
            btnCalss="btn btn-danger btnRight"
            btnTitle="Reject"

          />
          <Buttonscomponent
            buttonFunction={() => this.approveRoles()}
            btnType="button"
            btnCalss="btn btn-success btnRight"
            btnTitle="Approve"
          />
        </div>
      }
      else if (this.props.status == Enums.USER_AND_ROLE_MANAGEMENT_STATUS.APPROVED || this.props.status == Enums.USER_AND_ROLE_MANAGEMENT_STATUS.REJECTED) {
        saveButton = <div>
          <Buttonscomponent
            buttonFunction={() => this.updateRoles()}
            btnType="button"
            btnCalss="btn btn-danger btnRight"
            btnTitle="Save"
            buttonDisabled={!this.state.formIsValid}
          /></div>
      }
    }

    buttons = <div className="col-md-12">

      <Buttonscomponent
        buttonFunction={() => this.cancelFunc()}
        btnType="button"
        btnCalss="btn btn-default btnRight"
        btnTitle="Cancel"
      />
      {approveRejectButton}
      {saveButton}
    </div>

    if ((this.props.error == '' || this.props.error == null)) {
      
      for (let key in this.state.orderForm) {
        formElementsArray.push({
          id: key,
          config: this.state.orderForm[key]
        });
      }
  
      let frm = (
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


      content = <div className="customCollapseContent clearfix">

        {frm}
        <div className="col-md-12">
          <div className="customFormGroup clearfix">
            <p className="errorstyle" style={errorcss}>{this.state.mCheckedError}</p>
            <label>Groups</label>

          </div>
          {table}
          {buttons}
        </div>

        <div className={reload}>
          <div className="portlet-loader">Loading...</div>
        </div>

      </div>
    }
    else {
      errorMsg = <div className="col-md-12"><Alertmesgcomponent
        messageClassName="alert alert-danger"
        messageTitle=""
        messageDescription="Data not migrated successfully"
      />
      </div>
    }


    if (this.props.successMsg) {
      successMsg = <div className="col-md-12"><Alertmesgcomponent
        messageClassName="alert alert-success"
        messageTitle=""
        messageDescription={this.state.msg}

      />
      </div>
    }

    if (this.props.error !== '' && this.props.error !== null) {
      errorMsg = <div className="col-md-12"><Alertmesgcomponent
        messageClassName="alert alert-danger"
        messageTitle=""
        messageDescription={this.props.error}
      />
      </div>
    }

    return (
      <div>

        {/* <ul>
          {this.state.checked.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul> */}
        {successMsg}
        {errorMsg}
        <div className="col-md-12">
          <div className="customCollapse">
            <h1>Roles
              <a href="javascript:;" onClick={() => this.addAreaCollapse()}>
                <i className={this.state.addArea === false ? 'icon-arrow-left' : 'icon-arrow-down'}></i></a></h1>

            {content}

          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    successMsg: state.reducerUserManagement.successMsg,
    loading: state.reducerUserManagement.loading,
    error: state.reducerUserManagement.error,
    id: state.reducerUserManagement.Id,
    checked: state.reducerUserManagement.checked,
    properties: state.reducerUserManagement.properties,
    status: state.reducerUserManagement.status,
    activeRoles: state.reducerUserManagement.activeRoles
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onClearState: () => dispatch(ClearState("Edit")),
    onGetActiveRoles: () => dispatch(GetActiveRoles()),
    onApproveRole: (data) => dispatch(ApproveUser(data)),
    onRejectRole: (data) => dispatch(RejectUser(data)),
    onUpdateRolePermission: (data) => dispatch(UpdateUserPermission(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);


