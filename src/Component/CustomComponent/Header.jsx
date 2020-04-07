import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Scrollbars } from 'react-custom-scrollbars';
// import menuIcon from '../img/menuIcon.png';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuCollapse: false,
      logoTitle: true,
      headerMenu: false,

    }
  }

  componentDidMount() {
    document.addEventListener('click', this.menuClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.menuClickOutside, true);
  }

  menuClickOutside = event => {
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(event.target)) {
      this.setState({
        headerMenu: false
      });
    }
  }

  menuCollapsed() {
    this.setState({ menuCollapse: !this.state.menuCollapse })
    this.setState({ logoTitle: !this.state.logoTitle })
    this.props.sidebarCtrlFunc();
    this.props.titleCtrlFunc();
  }

  logout() {
    browserHistory.push('/');
  }

  menuSelected(menuType) {
    if (this.state.headerMenu === menuType) {
      this.setState({ headerMenu: null })
    }
    else {
      this.setState({ headerMenu: menuType })
    }
  }

  render() {

    let btn_class = this.state.menuCollapse ? "logoAreaCollapse" : "logoArea";

    return (
      <div className="dashboard_Header">
        <a href="javascript:;" className={btn_class}>
          <img src="assets/images/logo.png" className="logo" alt="logo" alt="" />
        </a>
        <a href="javascript:;" onClick={this.menuCollapsed.bind(this)}>
          <img className="menuIcon" src="assets/images/menuIcon.png" alt="" />
        </a>
        <a href="javascript:;" className="logout" onClick={this.logout.bind(this)}>
          <i className="icon-power"></i></a>

        <div className="headerMenuMain">
          <div onClick={() => this.menuSelected("item1")} className="headerMenu"><span>8</span>
            <i className="icon-bell"></i></div>
          {this.state.headerMenu === 'item1' ?
            <div className="headerMenuDetailBox">
              <h1>Notifications</h1>
              <Scrollbars style={{ height: 300 }}>
                <ul>
                  <li><a href="#_">Notifications 1</a></li>
                  <li><a href="#_">Notifications 2</a></li>
                  <li><a href="#_">Notifications 3</a></li>
                  <li><a href="#_">Notifications 4</a></li>
                  <li><a href="#_">Notifications 5</a></li>
                  <li><a href="#_">Notifications 6</a></li>
                  <li><a href="#_">Notifications 7</a></li>
                  <li><a href="#_">Notifications 8</a></li>
                  <li><a href="#_">Notifications 9</a></li>
                  <li><a href="#_">Notifications 10</a></li>
                  <li><a href="#_">Notifications 11</a></li>
                  <li><a href="#_">Notifications 12</a></li>
                </ul>
              </Scrollbars>
            </div>
            : null}
          <div onClick={() => this.menuSelected("item2")} className="headerMenu"><span>15</span>
            <i className="icon-envelope-open"></i></div>
          {this.state.headerMenu === 'item2' ?
            <div className="headerMenuDetailBox">
              <h1>Messages</h1>
              <Scrollbars style={{ height: 300 }}>
                <ul>
                  <li><a href="#_">Messages 1</a></li>
                  <li><a href="#_">Messages 2</a></li>
                  <li><a href="#_">Messages 3</a></li>
                  <li><a href="#_">Messages 4</a></li>
                  <li><a href="#_">Messages 5</a></li>
                  <li><a href="#_">Messages 6</a></li>
                  <li><a href="#_">Messages 7</a></li>
                  <li><a href="#_">Messages 8</a></li>
                  <li><a href="#_">Messages 9</a></li>
                  <li><a href="#_">Messages 10</a></li>
                  <li><a href="#_">Messages 11</a></li>
                  <li><a href="#_">Messages 12</a></li>
                </ul>
              </Scrollbars>
            </div>
            : null}
          <div onClick={() => this.menuSelected("item3")} className="headerMenu"><span>6</span>
            <i className="icon-calendar"></i></div>
          {this.state.headerMenu === 'item3' ?
            <div className="headerMenuDetailBox">
              <h1>Tasks</h1>
              <Scrollbars style={{ height: 300 }}>
                <ul>
                  <li><a href="#_">Tasks 1</a></li>
                  <li><a href="#_">Tasks 2</a></li>
                  <li><a href="#_">Tasks 3</a></li>
                  <li><a href="#_">Tasks 4</a></li>
                  <li><a href="#_">Tasks 5</a></li>
                  <li><a href="#_">Tasks 6</a></li>
                  <li><a href="#_">Tasks 7</a></li>
                  <li><a href="#_">Tasks 8</a></li>
                  <li><a href="#_">Tasks 9</a></li>
                  <li><a href="#_">Tasks 10</a></li>
                  <li><a href="#_">Tasks 11</a></li>
                  <li><a href="#_">Tasks 12</a></li>
                </ul>
              </Scrollbars>
            </div>
            : null}
        </div>
        <div className="btn-group profileMenu">
          <button type="button" className="btn pm-btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
          <img src="assets/images/avatar3.jpg" alt="" /> M Waqas <i className="caret"></i> </button>
          <ul className="dropdown-menu">
            <li><a href="#_"><i className="fa fa-user"></i> My Profile</a></li>
            <li><a href="#_"><i className="fa fa-calendar"></i> My Calendar</a></li>
            <li><a href="#_"><i className="fa fa-envelope-o"></i> My Inbox 3 </a></li>
            <li><a href="#_"><i className="fa fa-bullhorn"></i> My Tasks 5 </a></li>
            <li><a href="#_"><i className="fa fa-lock"></i> Lock Screen</a></li>
            <li><a href="#_"><i className="glyphicon glyphicon-off"></i> Log Out </a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;




