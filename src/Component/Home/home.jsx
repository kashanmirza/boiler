import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import logo from '../../logo.svg';
import { connect } from 'react-redux';
// import {  restAPI  }
//  from '../actions/index';
import { bindActionCreators } from 'redux';
var sortBy = require('sort-by');

class Home extends Component {

 
    constructor(props) {
        super(props);
    
        this.state = {
    
        }
      }  
    
      componentDidMount() {
    
      }
    
  render() {
    console.log(this.props.restAPIReducer);
    return (
        <div className="row">
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <Link className="homeTab" to="/Membership/MembershipManagement">
            <i className="icon-people"></i><h1>Membership Management</h1>
          </Link>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <Link className="homeTab" to="/Membership/MembershipRequest">
            <i className="icon-user-following"></i><h1>Membership Request</h1>
          </Link>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <Link className="homeTab" to="/Event/EventRequest">
            <i className="icon-event"></i><h1>Event Request</h1>
          </Link>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <Link className="homeTab" to="/MembersManagement">
            <i className="icon-people"></i><h1>Members Management</h1>
          </Link>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <Link className="homeTab" to="/Packages">
            <i className="icon-grid"></i><h1>Packages</h1>
          </Link>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <Link className="homeTab" to="/PaymentManagement">
            <i className="fa fa-dollar"></i><h1>Payment Management</h1>
          </Link>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <Link className="homeTab" to="/FacilityManagement">
            <i className="fa fa-hospital-o"></i><h1>Facility Management</h1>
          </Link>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <Link className="homeTab" to="/MemberSearch">
            <i className="icon-magnifier"></i><h1>Member Search</h1>
          </Link>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <Link className="homeTab" to="/Role/Role">
            <i className="icon-settings"></i><h1>Role Management</h1>
          </Link>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <Link className="homeTab" to="/Notifications">
            <i className="icon-bell"></i><h1>Notifications</h1>
          </Link>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <Link className="homeTab" to="/Alerts">
            <i className="icon-envelope-open"></i><h1>Alerts</h1>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
  //  restAPIReducer: state.restAPIReducer.restResponse.list,
  };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
    //restAPI: restAPI,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);