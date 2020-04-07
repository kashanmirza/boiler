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
import { GetAllPermission, SaveRolePermission,ClearState } from '../../store/Actions/role';
import Alertmesgcomponent from '../CustomComponent/Alertmesgcomponent';
import Enums from '../../Common/Enum';

class Role extends Component {

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
      mCheckedError:''
      
    }
  }

  // shouldComponentUpdate(){
  //   this.props.onClearState();
  //   return true;
  // }

  componentWillMount(){
    this.props.onClearState();
  }

  componentDidMount() {
    this.props.onGetAllPermission();
  }

  addRoles = () => {

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
        CreatedBy: 'saveRole'
      }

      this.props.onSaveRolePermission(data).then((res) => {
          
          if (this.props.error == undefined || this.props.error == '' || this.props.error == null) {
            this.setState({ mName: '', mCommints: '', mDescription: '', checked: [] });
          }
        })
        .catch(err => {
          debugger;
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

  portlateReload() {
    this.setState({ reloadResult: !this.state.reloadResult });
    setTimeout(function () {
      this.setState({ reloadResult: false });
    }.bind(this), 500)
  }

  render() {
    const reload = this.state.reloadResult ? 'portletMask' : 'data-hide';
    let checkBoxTree = null;
    if (this.props.allRolePermission !== "") {
      checkBoxTree = <CheckboxTree
        nodes={this.props.allRolePermission}
        checked={this.state.checked}
        expanded={this.state.expanded}
        onCheck={checked => this.setState({ checked })}
        onExpand={expanded => this.setState({ expanded })}></CheckboxTree>
    }
    let content = null;

    if (this.props.error == '' || this.props.error == null) {

      content = <div className="customCollapseContent clearfix">
        <div className="col-md-4">
          <Textinputcomponent
            inputLable="Name"
            inputPlaceholder="Enter Name"
            inputName="mName"
            inputType="text"
            inputValue={this.state.mName}
            inputDisabled={false}
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
            inputDisabled={false}
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
            textareaDisabled={false}
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
          />

          {/* <Buttonscomponent
            buttonFunction={() => this.cancelFunc()}
            btnType="button"
            btnCalss="btn btn-danger btnRight"
            btnTitle="Reject"
          />


          <Buttonscomponent
            buttonFunction={() => this.cancelFunc()}
            btnType="button"
            btnCalss="btn btn-success btnRight"
            btnTitle="Approve"
          /> */}
        </div>
        <div className={reload}>
          <div className="portlet-loader">Loading...</div>
        </div>

      </div>
    }

    let successMsg = null;
    let errorMsg = null;
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
    error: state.reducerRole.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onGetAllPermission: () => dispatch(GetAllPermission()),
    onSaveRolePermission: (data) => dispatch(SaveRolePermission(data)),
    onClearState : () => dispatch(ClearState("No"))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Role);


