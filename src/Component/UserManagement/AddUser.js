import React, { Component } from 'react';
import Buttonscomponent from '../CustomComponent/Buttonscomponent';
import Textinputcomponent from '../CustomComponent/Textinputcomponent';
import Textareacomponent from '../CustomComponent/Textareacomponent';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { GetAllPermission, SaveRolePermission,ClearState } from '../../store/Actions/role';
import { ClearState, GetActiveRoles, SaveUserPermission } from '../../store/Actions/userManagement';
import Alertmesgcomponent from '../CustomComponent/Alertmesgcomponent';
import Enums from '../../Common/Enum';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//  import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import Useravatar from '../CustomComponent/Useravatar';
import Anchorcomponent from '../CustomComponent/Anchorcomponent';
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
class AddUser extends Component {

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
      formIsValid:false,
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

  // shouldComponentUpdate(){
  //   this.props.onClearState();
  //   return true;
  // }

  componentWillMount() {
    this.props.onClearState();
  }

  componentDidMount() {
    this.props.onGetActiveRoles();
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
    this.setState({ orderForm: updatedFormElement,formIsValid:false  });
  }

  addRoles = () => {

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
        CreatedBy: 'saveUser'
      }

      this.props.onSaveUserPermission(data)
        .then((res) => {
         
          if (this.props.error == undefined || this.props.error == '' || this.props.error == null) {
            this.setState({ checked: [] });
            this.EmptyTextBoxesValues();
            // this.refs.table.setState({
            //   selectedRowKeys: []
            // });
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

  onSelectAll = (isSelected, rows) => {

    var arrays = [];
    //alert(`is select all: ${isSelected}`);
    if (isSelected) {
      // alert('Current display and selected data: ');
    } else {
      // alert('unselect rows: ');
    }
    for (let i = 0; i < rows.length; i++) {
      arrays.push(rows[i].id);
    }

  }

  onRowSelect = (row, isSelected, e) => {
    let rowStr = '';
    for (const prop in row) {
      rowStr += prop + ': "' + row[prop] + '"';
    }
    console.log(e);
    alert(`is selected: ${isSelected}, ${rowStr}`);
  }

  cancelFunc() {
    // this.setState({
    // })
    this.props.history.push('/UserManagement/SearchUser');
  }

  portlateReload() {
    this.setState({ reloadResult: !this.state.reloadResult });
    setTimeout(function () {
      this.setState({ reloadResult: false });
    }.bind(this), 500)
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
  }


  render() {

    const errorcss = {
      bottom: 'unset',
    };

    const columns = [{
      dataField: 'id',
      text: 'ID'
    }, {
      dataField: 'roleName',
      text: 'First Name',
      sort:true
    }, {
      dataField: 'description',
      text: 'Last Name'
    }];

    let content = null;
    let frm = null;
    const reload = this.state.reloadResult ? 'portletMask' : 'data-hide';
    let table = null;
    const formElementsArray = [];
    let successMsg = null;
    let errorMsg = null;


    if (this.props.activeRoles !== null) {

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
                      Page = "AddUser"
                      checked = {null}
                      result = {null}
                      />
    }
    
    if (this.props.error == '' || this.props.error == null) {

      for (let key in this.state.orderForm) {
        formElementsArray.push({
          id: key,
          config: this.state.orderForm[key]
        });
      }
     
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

            <label>Groups</label>
          </div>
          <p className="errorstyle" style={errorcss}>{this.state.mCheckedError}</p>
          {table}
        </div>
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
            buttonDisabled = {!this.state.formIsValid}
          />
        </div>
        <div className={reload}>
          <div className="portlet-loader">Loading...</div>
        </div>

      </div>
    }

    if (this.props.successMsg) {
      successMsg = <div className="col-md-12"><Alertmesgcomponent
        messageClassName="alert alert-success"
        messageTitle=""
        messageDescription="Record has been saved succesfully."
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
            <h1>Users Management
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
    activeRoles: state.reducerUserManagement.activeRoles
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSaveUserPermission: (data) => dispatch(SaveUserPermission(data)),
    onGetActiveRoles: () => dispatch(GetActiveRoles()),
    onClearState: () => dispatch(ClearState("No"))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddUser);


