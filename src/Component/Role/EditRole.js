import React, { Component } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import Buttonscomponent from '../CustomComponent/Buttonscomponent';
import Textinputcomponent from '../CustomComponent/Textinputcomponent';
// import Reactselectcomponent from '../CustomComponent/Reactselectcomponent';
// import DateTimePicker from 'react-datetime-picker';
// import TimePicker from 'react-time-picker';
import Textareacomponent from '../CustomComponent/Textareacomponent';
// import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import { Button, Modal } from 'react -bootstrap';
import { connect } from 'react-redux';
import { GetAllPermission, UpdateRolePermission,GetPermissionById,ClearState,ApproveRole,RejectRole } from '../../store/Actions/role';
import Alertmesgcomponent from '../CustomComponent/Alertmesgcomponent';
import { bindActionCreators } from 'redux';
// import ENUMNAME from '../../Common/Enum';
import Enums from '../../Common/Enum';

class EditRole extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      expanded: [],
      nodes: [],
      mCommints: '',
      mCommintsError: '',
      mName: '',
      mNameError: '',
      mDescriptionError: '',
      mDescription: '',
      reloadResult: false,
      mCheckedError:'',
      msg:''
    }
  }

  componentWillMount(){
    this.props.onClearState();
  }

  componentDidMount() {
   
    console.log(this.props.properties);
    if (this.props.id !== null) {
      // const Permissions = {
      //   PermissionId:this.props.id
      // }
      //this.props.onGetPermissionById(Permissions);
      this.setState({ mName : this.props.properties.name,
        mCommints : this.props.properties.comments,
        mDescription: this.props.properties.description,
        checked:this.props.checked
      })
    }
    this.props.onGetAllPermission();
  }

  approveRoles = () => {

    if (this.state.mName === "") {
      this.setState({ mNameError: 'please enter name' })
    }
    else {
      this.setState({
        mNameError: false
      })
    }
    if (this.state.mCommints === "") {
      this.setState({ mCommintsError: 'please enter comments' })
    }
    else {
      this.setState({
        mCommintsError: false
      })
    }


    if (this.state.mDescription === "") {
      this.setState({ mDescriptionError: 'please enter description' })
    }
    else {
      this.setState({
        mDescriptionError: false
      })
    }

    if (this.props.checked.length === 0) {
      this.setState({ mCheckedError: 'please select atleast one permission' })
    }
    else {
      this.setState({
        mCheckedError: false
      })
    }


    if (!(this.state.mName === "") && !(this.state.mCommints === "") && !(this.state.mDescription === "")  && !(this.props.checked.length === 0)) {

      this.portlateReload();
      const Permissions = {
        Permission: {
          Id: this.props.id,
          Status:Enums.USER_AND_ROLE_MANAGEMENT_STATUS.APPROVED,
          CreatedBy: 'approveRole'
        }
       
      }

      this.props.onApproveRole(Permissions)
        .then((res) => {
         
          if (this.props.error == undefined || this.props.error == '' || this.props.error == null) {
            this.setState({ mName: '', mCommints: '', mDescription: '', checked: [],msg:'Record has been approved successfully' });
            
          }
        })
        .catch(err => {
          console.log('ERROR:' + err);
        });
    }
  }

  rejectRoles = () => {

    if (this.state.mName === "") {
      this.setState({ mNameError: 'please enter name' })
    }
    else {
      this.setState({
        mNameError: false
      })
    }
    if (this.state.mCommints === "") {
      this.setState({ mCommintsError: 'please enter comments' })
    }
    else {
      this.setState({
        mCommintsError: false
      })
    }


    if (this.state.mDescription === "") {
      this.setState({ mDescriptionError: 'please enter description' })
    }
    else {
      this.setState({
        mDescriptionError: false
      })
    }

    if (this.props.checked.length === 0) {
      this.setState({ mCheckedError: 'please select atleast one permission' })
    }
    else {
      this.setState({
        mCheckedError: false
      })
    }


    if (!(this.state.mName === "") && !(this.state.mCommints === "") && !(this.state.mDescription === "")  && !(this.props.checked.length === 0)) {

      //this.portlateReload();
      const Permissions = {
        Permission: {
          Id: this.props.id,
          Status:Enums.USER_AND_ROLE_MANAGEMENT_STATUS.REJECTED,
          CreatedBy: 'rejectRole'
        }
       
      }

      this.props.onRejectRole(Permissions)
        .then((res) => {
         
          if (this.props.error == undefined || this.props.error == '' || this.props.error == null) {
            this.setState({ mName: '', mCommints: '', mDescription: '', checked: [],msg:'Record has been rejected successfully' });
            
          }
        })
        .catch(err => {
          console.log('ERROR:' + err);
        });
    }
  }

  
  updateRoles = () => {

    if (this.state.mName === "") {
      this.setState({ mNameError: 'please enter name' })
    }
    else {
      this.setState({
        mNameError: false
      })
    }
    if (this.state.mCommints === "") {
      this.setState({ mCommintsError: 'please enter comments' })
    }
    else {
      this.setState({
        mCommintsError: false
      })
    }


    if (this.state.mDescription === "") {
      this.setState({ mDescriptionError: 'please enter description' })
    }
    else {
      this.setState({
        mDescriptionError: false
      })
    }
    
    if (this.state.checked.length === 0) {
      this.setState({ mCheckedError: 'please select atleast one permission' })
    }
    else {
      this.setState({
        mCheckedError: false
      })
    }

    if (!(this.state.mName === "") && !(this.state.mCommints === "") && !(this.state.mDescription === "") && !(this.state.checked.length === 0)) {

      this.portlateReload();
      const data = {
        Role: {
          Name: this.state.mName,
          Comments: this.state.mCommints,
          Description: this.state.mDescription
        },
        Permissions: this.state.checked,
        Status:Enums.USER_AND_ROLE_MANAGEMENT_STATUS.PENDING,
        CreatedBy: 'updateRole'
      }

      this.props.onUpdateRolePermission(data)
        .then((res) => {
          console.log('this.props.error');
          console.log(this.props.error);
          if (this.props.error == undefined || this.props.error == '' || this.props.error == null) {
            this.setState({ mName: '', mCommints: '', mDescription: '', checked: [],msg: 'Record has been updated successfully' });
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
    
    this.props.history.push('/Role/SearchRole');
  }

  ApproveFunc() {
    // this.setState({
    // })
    this.props.history.push('/Role/SearchRole');
  }


  RejectFunc() {
    // this.setState({
    // })
    this.props.history.push('/Role/SearchRole');
  }

  portlateReload() {
    this.setState({ reloadResult: !this.state.reloadResult });
    setTimeout(function () {
      this.setState({ reloadResult: false });
    }.bind(this), 500)
  }

  render() {

    const reload = this.state.reloadResult ? 'portletMask' : 'data-hide';
    let checkBoxTree = null;
    if (this.props.allRolePermission !== "" && this.props.status == Enums.USER_AND_ROLE_MANAGEMENT_STATUS.PENDING) {
      checkBoxTree = <CheckboxTree
        nodes={this.props.allRolePermission}
        checked={this.state.checked}
        expanded={this.state.expanded}
        onCheck={checked => this.setState({ checked })}
        onExpand={expanded => this.setState({ expanded })}
         disabled={true}
        ></CheckboxTree>
    }
    else if(this.props.allRolePermission !== "" && (this.props.status == Enums.USER_AND_ROLE_MANAGEMENT_STATUS.APPROVED || this.props.status == Enums.USER_AND_ROLE_MANAGEMENT_STATUS.REJECTED)) {
      checkBoxTree = <CheckboxTree
      nodes={this.props.allRolePermission}
      checked={this.state.checked}
      expanded={this.state.expanded}
      onCheck={checked => this.setState({ checked })}
      onExpand={expanded => this.setState({ expanded })}
      
      ></CheckboxTree>
    }
    let content = null;
    let successMsg = null;
    let errorMsg = null;
    let buttons = null;

    let approveRejectButton = null;
    let saveButton = null;
    if(this.props.id != null)
    {
      if(this.props.status == Enums.USER_AND_ROLE_MANAGEMENT_STATUS.PENDING){
        approveRejectButton =  <div>
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
      else if(this.props.status == Enums.USER_AND_ROLE_MANAGEMENT_STATUS.APPROVED || this.props.status == Enums.USER_AND_ROLE_MANAGEMENT_STATUS.REJECTED)
      {
       saveButton = <div>
        <Buttonscomponent
         buttonFunction={() => this.updateRoles()}
         btnType="button"
         btnCalss="btn btn-danger btnRight"
         btnTitle="Save"
       /></div> 
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
    
    }

    if ((this.props.error == '' || this.props.error == null)) {

      content = <div className="customCollapseContent clearfix">
        <div className="col-md-4">
          <Textinputcomponent
            inputLable="Name"
            inputPlaceholder="Enter Name"
            inputName="mName"
            inputType="text"
            inputValue={this.state.mName}
            inputDisabled={true}
            inputCalssName="form-control"
            inputID=""
            inputHandle={e => this.addHandleChange(e)}
          />
          <p className="errorstyle">{this.state.mNameError}</p>
        </div>
        <div className="col-md-4">
          <Textinputcomponent
            inputLable="Description"
            inputPlaceholder="Enter Description"
            inputName="mDescription"
            inputType="text"
            inputValue={this.state.mDescription}
            inputDisabled={true}
            inputCalssName="form-control"
            inputID=""
            inputHandle={e => this.addHandleChange(e)}
          />
          <p className="errorstyle">{this.state.mDescriptionError}</p>
        </div>

        <div className="col-md-4">
          <Textareacomponent
            textareaLable="Comments Here"
            textareaCalssName="form-control"
            textareaPlaceholder="Comments ..."
            textareaName="mCommints"
            textareaRows="3"
            textareaCols="2"
            textareaID=""
            textareaDisabled={true}
            textareaValue={this.state.mCommints}
            textareaHandle={e => this.addHandleChange(e)}
          />
          <p className="errorstyle">{this.state.mCommintsError}</p>
        </div>


        <div className="col-md-12">
          <div className="customFormGroup clearfix">
          <p className="errorstyle">{this.state.mCheckedError}</p>
            <label>Permissions</label>

          </div>
          {checkBoxTree}
          {buttons}
        </div>
        
        <div className={reload}>
          <div className="portlet-loader">Loading...</div>
        </div>

      </div>
    }
    else{
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
    allRolePermission: state.reducerRole.allRolePermission,
    successMsg: state.reducerRole.successMsg,
    loading: state.reducerRole.loading,
    error: state.reducerRole.error,
    id: state.reducerRole.Id,
    checked:state.reducerRole.checked,
    properties : state.reducerRole.properties,
    status : state.reducerRole.status
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onGetAllPermission: () => dispatch(GetAllPermission()),
    onUpdateRolePermission: (data) => dispatch(UpdateRolePermission(data)),
    onGetPermissionById : (Permissions) => dispatch(GetPermissionById(Permissions)),
    onClearState : () => dispatch(ClearState("Edit")),
    onApproveRole : (data) => dispatch (ApproveRole(data)),
    onRejectRole : (data) => dispatch (RejectRole(data))
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(EditRole);


