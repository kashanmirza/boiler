import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IsAuthorized, logout } from './store/Actions/users';
import { alertActions } from './store/Actions/alerts';
import Auth from './Utils/Auth';
import Model from './store/Models/Model';
import Utils from './Utils/CommonUtils'
import history from './History';

import MembershipManagement from './Component/Membership/MembershipManagement';
import MembershipRequest from './Component/Membership/MembershipRequest';
import EventRequest from './Component/Event/EventRequest';
import Login from './Component/User/Login';
import Master from './Component/Master';
import Profile from './Component/CustomComponent/Profile';
import Home from './Component/Home/home';
import PrivateRoute from './ProtectedRoute';
import Role from './Component/Role/Role';
import MembershipRequestDetail from './Component/Membership/MembershipRequestDetails';
import SearchRole from './Component/Role/SearchRole';
import EditRole from './Component/Role/EditRole';
import SearchUser from './Component/UserManagement/SearchUser';
import AddUser from './Component/UserManagement/AddUser';
import EditUser from './Component/UserManagement/EditUser';

const ComponentsObj = {
  MembershipManagement,
  EventRequest,
  MembershipRequest,
  Home,
  Role,
  MembershipRequestDetail,
  SearchRole,
  EditRole,
  SearchUser,
  AddUser,
  EditUser
};

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
    });


    this.state = {
      user: Model.user,

      // Theme State
      sidebarCtrl: 'dashboard_Sitebar',
      titleCtrl: 'titleShow',
      selectedMenu: 'item1',
      menuCollapse: false,
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      hours: new Date().getHours(),
      min: new Date().getMinutes(),
      sec: new Date().getSeconds(),

    }
  }


  componentWillMount() {
  //  console.log("App componentWillMount");
    this.props.ValidateIsAuthorized();
    this.setState(this.props.user)
    //console.log("App | componentDidMount() | ValidateIsAuthorized() | props.user.isAuthenticated | ", this.props.user.isAuthenticated);
  }

  // Theme Helping Functions
  sidebarCtrlFunc() {
    this.setState({
      sidebarCtrl: this.state.sidebarCtrl == 'dashboard_Sitebar' ? 'dashboard_Sitebar_Collaps' : 'dashboard_Sitebar',
    })
    this.setState({
      titleCtrl: this.state.titleCtrl == 'titleShow' ? 'titleHide' : 'titleShow',
    })
    this.setState({ menuCollapse: !this.state.menuCollapse });
  }

  menuSelected(menuType) {
    if (this.state.selectedMenu === menuType) {
      this.setState({ selectedMenu: null })
    }
    else {
      this.setState({ selectedMenu: menuType })
    }
  }

  render() {
    const { alert } = this.props;
    let logoArea_Ctrl = this.state.menuCollapse ? "logoAreaCollapse" : "logoArea";
    let isAuthenticated = Auth.CurrentUser().isAuthenticated;
    let routes;
    //this.state.user.isAuthenticated
    if (isAuthenticated === true) {
      routes = (

        <div>
          <div className="dashboard_Header">
            <div className={logoArea_Ctrl}>
              <img src="../assets/images/logo.png" className="logo" alt="logo" alt="" />
            </div>
            <a href="javascript:;" onClick={this.sidebarCtrlFunc.bind(this)}>
              <img className="menuIcon" src="../assets/images/menuIcon.png" alt="" />
            </a>
            <p className="greetingMsg">Welcome admin <span>Last Login 1:49 PM 20/5/2019</span></p>
            <a href="javascript:;" className="logout" onClick={() => {
              this.props.onLogout();
            }
            }>
              <i className="icon-power"></i></a>
            {/*   <Headermenu /> */}

            <div className="btn-group profileMenu">
              <button type="button" className="btn pm-btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="../assets/images/avatar3.jpg" alt="" /> {Auth.CurrentUser().UserName} <i className="caret"></i> </button>
              <ul className="dropdown-menu">
                <li><a href="#_"><i className="glyphicon glyphicon-off"></i> Log Out </a></li>
              </ul>
            </div>
          </div>

          <div className={this.state.sidebarCtrl}>
            <ul className="sideMenu">
              {/* <li key='001' >
                <Link className={this.state.selectedMenu === 'item1' ? 'active' : ''}
                  onClick={() => this.menuSelected("item1")}
                  to="/"  >
                  <i className="icon-home"></i>
                  <title className={this.state.titleCtrl}>
                    Home
                  </title>
                </Link>
              </li> */}
              {
                Utils.ParserUserMenuPermission(this.state.user.Permissions).map(item =>
                  <li key={item.id} >
                    <Link className={this.state.selectedMenu === 'item1' ? 'active' : ''}
                      onClick={() => this.menuSelected("item1")}
                      to={item.componentURL}  >

                      <i className="icon-home"></i>
                      <title className={this.state.titleCtrl}>
                        {item.text}
                      </title>
                    </Link></li>)
              }
            </ul>
          </div>

          <div className="dashboard_Container">
            <div className="col-sm-8 col-sm-offset-2">
              {alert.message &&
                <div className={`alert ${alert.type}`}>sdsdcscdcs{alert.message}</div>
              }
            </div>

            {
              Utils.ParserUserRoutesPermission(this.state.user.Permissions).map(item =>
                <Route key={item.id} path={item.componentURL}
                  exact component={ComponentsObj[item.componentName]} />)
            }
            <Route path="/Master" exact component={Master} user={this.state.user} />


          </div>
          <div className="footer clearfix">
            <p>Current Date &amp; Time:
        <span>{this.state.date} / {this.state.month} / {this.state.year}</span>
              <span> {this.state.hours} / {this.state.min} / {this.state.sec}</span>
            </p>
          </div>
        </div>
      );
    }
    else {
      routes = (
        <Login>
          <Route path="/" exact component={Login}></Route>
          <Redirect to="/" />
        </Login>
      );
    }

    return (
      <div>
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
//  console.log(state);
  console.log(Auth.CurrentUser());
  const { alert } = state;
  return {
    user: state.reducerUser.user
    , alert
  }
}

function mapDispatchToProps(dispatch) {

  return {
    ValidateIsAuthorized: () => dispatch(IsAuthorized()),
    onLogout: () => dispatch(logout())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));