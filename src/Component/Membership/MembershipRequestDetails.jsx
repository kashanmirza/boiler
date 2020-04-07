import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { addMembershipManagement, memberDelete, editMember } from '../actions/membershipManagementAction';
import { bindActionCreators } from 'redux';
import Buttonscomponent from '../CustomComponent/Buttonscomponent';
import Textinputcomponent from '../CustomComponent/Textinputcomponent';
import Reactselectcomponent from '../CustomComponent/Reactselectcomponent';
import DateTimePicker from 'react-datetime-picker';
import Useravatar from '../CustomComponent/Useravatar';
import Tablebutton from '../CustomComponent/Tablebutton';
import TimePicker from 'react-time-picker';
import Textareacomponent from '../CustomComponent/Textareacomponent';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Button, Modal } from 'react-bootstrap';
import logo from '../../logo.svg';
var moment = require('moment');

import history from '../../History';

import Utils from '../../Utils/CommonUtils';

class MembershipRequestDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {

      searchName: '',
      searchCenter: '',
      searchStatus: '',
      searchType: '',
      searchSubscriptionType: '',
      sFromDate: new Date(),
      sToDate: new Date(),

      searchArea: true,
      resultArea: true,
      addArea: true,
      addMemberForm: false,
      genericArea: true,

      mName: '',
      mCenter: '',
      mStatus: '',
      mType: '',
      mSubscriptionType: '',
      mCommints: '',
      mStartTime: '12:00',
      mEndTime: '12:00',
      mFromDate: new Date(),
      mEndDate: new Date(),
      mRegistrationDate: new Date(),

      editID: null,
      editMode: false,
      showModal: false,

    }
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  searchAreaCollapse() {
    this.setState({
      searchArea: !this.state.searchArea
    })
  }

  resultAreaCollapse() {
    this.setState({
      resultArea: !this.state.resultArea
    })
  }

  addAreaCollapse() {
    this.setState({
      addArea: !this.state.addArea
    })
  }

  addMember() {
    this.setState({
      addMemberForm: true,
      genericArea: false,
      editMode: false,
    })
  }

  cancelFunc() {
    
    this.props.history.push('/Membership/MembershipRequest');
    // this.setState({
    //   addMemberForm: false,
    //   genericArea: true,
    //   mName: "",
    //   mCenter: "",
    //   mStartTime: '12:00',
    //   mEndTime: '12:00',
    //   mFromDate: new Date(),
    //   mEndDate: new Date(),
    //   mStatus: "",
    //   mType: "",
    //   mSubscriptionType: "",
    //   mRegistrationDate: new Date(),
    //   mCommints: "",

    //})
  }

  searchResult() {
    console.log('search method call');
  }

  searchHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  searchFromDateChange = sFromDate => this.setState({ sFromDate });
  searchToDateChange = sToDate => this.setState({ sToDate });

  mStartTimeChange = mStartTime => this.setState({ mStartTime });
  mEndTimeChange = mEndTime => this.setState({ mEndTime });
  mFromDateChange = mFromDate => this.setState({ mFromDate });
  mEndDateChange = mEndDate => this.setState({ mEndDate });
  mRegistrationDateChange = mRegistrationDate => this.setState({ mRegistrationDate });


  componentDidMount() {

  }

  viewRow(row) {
    this.setState({
      showModal: true,
      row: row
    })
    console.log('Row View', row);
  }

  editRow(row) {
    this.setState({
      addMemberForm: true,
      genericArea: false,
      editMode: true,
      row: row,
      editID: row.mID,
      mName: row.mName,
      mCenter: row.mCenter,
      mStatus: row.mStatus,
      mType: row.mType,
      mSubscriptionType: row.mSubscriptionType,
      mCommints: row.mCommints,
    })
    console.log('Row Edit', this.state);
  }

  updateMember(row) {
    var udata = this.props.membershipManagementList;
    for (let i = 0; i < udata.length; i++) {
      if (udata[i].mID == this.state.editID) {
        udata[i].mName = this.state.mName;
        udata[i].mCenter = this.state.mCenter;
        udata[i].mStatus = this.state.mStatus;
        udata[i].mType = this.state.mType;
        udata[i].mSubscriptionType = this.state.mSubscriptionType;
        udata[i].mCommints = this.state.mCommints;
      }
    }
    this.props.editMember(udata);
    this.setState({
      editID: null,
      addMemberForm: false,
      genericArea: true,
    })
    this.setState({ mName: '', mCenter: '', mStatus: '', mType: '', mSubscriptionType: '', mCommints: '' });
    console.log('update item', row);
  }

  deleteRow(row) {
    var index = this.props.membershipManagementList.indexOf(row);
  //  this.props.memberDelete(row);
    this.props.membershipManagementList.splice(index, 1);
    this.setState(this.props.membershipManagementList);
  }

  AddPro(row) {
    if (this.state.mName === "") {
      this.setState({ mNameError: 'please enter name' })
    }
    else {
      this.setState({
        mNameError: false
      })
    }
    if (this.state.mCenter === "") {
      this.setState({ mCenterError: 'please select center' })
    }
    else {
      this.setState({
        mCenterError: false
      })
    }
    if (this.state.mStatus === "") {
      this.setState({ mStatusError: 'please select status' })
    }
    else {
      this.setState({
        mStatusError: false
      })
    }
    if (this.state.mType === "") {
      this.setState({ mTypeError: 'please select type' })
    }
    else {
      this.setState({
        mTypeError: false
      })
    }
    if (this.state.mSubscriptionType === "") {
      this.setState({ mSubscriptionTypeError: 'please select subscription type' })
    }
    else {
      this.setState({
        mSubscriptionTypeError: false
      })
    }
    if (this.state.mCommints === "") {
      this.setState({ mCommintsError: 'please enetr comments' })
    }
    else {
      this.setState({
        mCommintsError: false
      })
    }
    if (this.state.mName != '' && this.state.mCenter != '' && this.state.mStatus != '' && this.state.mType != '' && this.state.mSubscriptionType != '' && this.state.mCommints != '') {
      var mID = this.props.membershipManagementList.length + 1;
      var mName = this.state.mName;
      var mCenter = this.state.mCenter;
      var mStartTime = this.state.mStartTime;
      var mEndTime = this.state.mEndTime;
      var mFromDate = this.state.mFromDate;
      var mEndDate = this.state.mEndDate;
      var mStatus = this.state.mStatus;
      var mType = this.state.mType;
      var mSubscriptionType = this.state.mSubscriptionType;
      var mRegistrationDate = this.state.mRegistrationDate;
      var mCommints = this.state.mCommints;

      var row = this.props.membershipManagementList.slice();
      row.push({
        mID: mID,
        mName: mName,
        mCenter: mCenter,
        mStartTime: mStartTime,
        mEndTime: mEndTime,
        mFromDate: mFromDate,
        mEndDate: mEndDate,
        mStatus: mStatus,
        mType: mType,
        mSubscriptionType: mSubscriptionType,
        mRegistrationDate: mRegistrationDate,
        mCommints: mCommints,
      });

      this.setState({
        membershipManagementList: row,
        mName: "",
        mCenter: "",
        mStartTime: '12:00',
        mEndTime: '12:00',
        mFromDate: new Date(),
        mEndDate: new Date(),
        mStatus: "",
        mType: "",
        mSubscriptionType: "",
        mRegistrationDate: new Date(),
        mCommints: "",

        row: row
      });
     // this.props.addMembershipManagement(row)
      console.log('Row Add', row);
    }
    else {
      return false
    }
    this.setState({
      addMemberForm: false,
      genericArea: true,
    })
  }

  render() {

    function avatarFormatter(cell, row) {
      return <Useravatar
        Useravatarname={row.mName}
        rowData={row} />
    }

    function buttonFormatter(cell, row) {
      return (
        <Tablebutton
          rowData={row}
          editButtonHandlar={this.editRow.bind(this)}
          viewButtonHandlar={this.viewRow.bind(this)}
          deleteButtonHandlar={this.deleteRow.bind(this)} />
      );
    }

    function columnStatusFormat(fieldValue, cell, row) {
      if (fieldValue != null) {
        return fieldValue.replace(" ", "") + '-status';
      }
    }

    return (
      <div className="col-md-12">
        <div className="row">

        <Modal
          show={this.state.showModal}
          onHide={this.hideModal.bind(this)}
          container={this}
          aria-labelledby="contained-modal-title">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              View Member Info...!
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.row != undefined ?
              <div className="fetchData">
                <p>Name: <span>{this.state.row.mName}</span></p>
                <p>Center: <span>{this.state.row.mCenter}</span></p>
                <p>Start Time: <span>{this.state.row.mStartTime}</span></p>
                <p>End Time: <span>{this.state.row.mEndTime}</span></p>
                <p>From Date: <span>{moment(this.state.row.mFromDate).format('MMMM Do YYYY, h:mm:ss a')}</span></p>
                <p>End Date: <span>{moment(this.state.row.mEndDate).format('MMMM Do YYYY, h:mm:ss a')}</span></p>
                <p>Status: <span>{this.state.row.mStatus}</span></p>
                <p>Type: <span>{this.state.row.mType}</span></p>
                <p>Subscription Type: <span>{this.state.row.mSubscriptionType}</span></p>
                <p>Registration Date: <span>{moment(this.state.row.mRegistrationDate).format('MMMM Do YYYY, h:mm:ss a')}</span></p>
                <p>Commints: <span>{this.state.row.mCommints}</span></p>
              </div>
              : null}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>

         
            <div className="customCollapse">
              <h1>Add Details
              <a href="javascript:;" onClick={() => this.addAreaCollapse()}>
                  <i className={this.state.addArea === false ? 'icon-arrow-left' : 'icon-arrow-down'}></i></a></h1>
              {this.state.addArea ?
                <div className="customCollapseContent clearfix">
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
                    <Reactselectcomponent
                      rcSelectCalss="form-control"
                      rcSelectLable="Select Center"
                      rcSelectFunc={e => this.addHandleChange(e)}
                      rcSelectVal={this.state.mCenter}
                      rsSelectID=""
                      rcSelectNam="mCenter"
                      rcSelectList={this.props.centerList}
                    />
                    <p className="errorstyle">{this.state.mCenterError}</p>
                  </div>
                  <div className="col-md-4 customFormGroup">
                    <label>Select Start Time</label>
                    <TimePicker
                      onChange={this.mStartTimeChange}
                      value={this.state.mStartTime}
                    />
                    <p className="errorstyle">{this.state.mStartTimeError}</p>
                  </div>
                  <div className="col-md-4 customFormGroup">
                    <label>Select End Time</label>
                    <TimePicker
                      onChange={this.mEndTimeChange}
                      value={this.state.mEndTime}
                    />
                  </div>
                  <div className="col-md-4 customFormGroup">
                    <label>From Date</label>
                    <DateTimePicker
                      onChange={this.mFromDateChange}
                      value={this.state.mFromDate}
                    />
                  </div>
                  <div className="col-md-4 customFormGroup">
                    <label>End Date</label>
                    <DateTimePicker
                      onChange={this.mEndDateChange}
                      value={this.state.mEndDate}
                    />
                  </div>
                  <div className="col-md-4">
                    <Reactselectcomponent
                      rcSelectCalss="form-control"
                      rcSelectLable="Select Status"
                      rcSelectFunc={e => this.addHandleChange(e)}
                      rcSelectVal={this.state.mStatus}
                      rsSelectID=""
                      rcSelectNam="mStatus"
                      rcSelectList={this.props.statusList}
                    />
                    <p className="errorstyle">{this.state.mStatusError}</p>
                  </div>
                  <div className="col-md-4">
                    <Reactselectcomponent
                      rcSelectCalss="form-control"
                      rcSelectLable="Select Type"
                      rcSelectFunc={e => this.addHandleChange(e)}
                      rcSelectVal={this.state.mType}
                      rsSelectID=""
                      rcSelectNam="mType"
                      rcSelectList={this.props.typeList}
                    />
                    <p className="errorstyle">{this.state.mTypeError}</p>
                  </div>
                  <div className="col-md-4">
                    <Reactselectcomponent
                      rcSelectCalss="form-control"
                      rcSelectLable="Select Subscription Type"
                      rcSelectFunc={e => this.addHandleChange(e)}
                      rcSelectVal={this.state.mSubscriptionType}
                      rsSelectID=""
                      rcSelectNam="mSubscriptionType"
                      rcSelectList={this.props.subscriptionList}
                    />
                    <p className="errorstyle">{this.state.mSubscriptionTypeError}</p>
                  </div>
                  <div className="col-md-4 customFormGroup">
                    <label>Registration End Date</label>
                    <DateTimePicker
                      onChange={this.mRegistrationDateChange}
                      value={this.state.mRegistrationDate}
                    />
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
                  <div className="col-md-12 marginTop">


                    { Utils.HasPermission("MembershipRequest-Create") ? this.state.editMode ?
                      <Buttonscomponent
                        buttonFunction={(row) => this.updateMember(row)}
                        btnType="button"
                        btnCalss="btn btn-danger btnRight"
                        btnTitle="Update"
                      />
                      :
                      <Buttonscomponent
                        buttonFunction={(row) => this.AddPro(row)}
                        btnType="button"
                        btnCalss="btn btn-danger btnRight"
                        btnTitle="Save"
                      /> : ""
                    }

                    <Buttonscomponent
                      buttonFunction={() => this.cancelFunc()}
                      btnType="button"
                      btnCalss="btn btn-default btnRight"
                      btnTitle="Cancel"
                    />
                  </div>
                </div>
                : null}
            </div>
          

        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    // membershipManagementList: state.mmReducer.membershipManagementList,
    // centerList: state.mmReducer.centerList,
    // statusList: state.mmReducer.statusList,
    // typeList: state.mmReducer.typeList,
    // subscriptionList: state.mmReducer.subscriptionList,
  };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({

    // addMembershipManagement: addMembershipManagement,
    // memberDelete: memberDelete,
    // editMember: editMember,

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MembershipRequestDetails);

