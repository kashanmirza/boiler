import React, { Component } from 'react';
import $ from 'jquery';
// import menuIcon from '../img/icon1.png';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarCtrl: this.props.sidebarCtrl,
      titleCtrl: this.props.titleCtrl,
      selectedMenu: 'item1',
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sidebarCtrl: nextProps.sidebarCtrl,
      titleCtrl: nextProps.titleCtrl
    })
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

    return (
      <div className={this.state.sidebarCtrl}>
        <ul className="sideMenu">
          <li><Link className={this.state.selectedMenu === 'item1' ? 'active' : ''} onClick={() => this.menuSelected("item1")} to="/Overview"><i className="icon-eye"></i><title className={this.state.titleCtrl}>Overview</title></Link></li>
          <li><Link className={this.state.selectedMenu === 'item2' ? 'active' : ''} onClick={() => this.menuSelected("item2")}>
          <i className="icon-list"></i><title className={this.state.titleCtrl}>Datamanipulaton</title>
          <img src={this.state.selectedMenu === 'item2' ? 'assets/images/icon2.png' : 'assets/images/icon1.png'} alt="" /></Link>
            {this.state.selectedMenu === 'item2' ?
              <ul>
                <li><Link to="/Dml"><title className={this.state.titleCtrl}>Table Handling</title></Link></li>
                <li><Link to="/Formhandling"><title className={this.state.titleCtrl}>Form Handling</title></Link></li>
                <li><Link to="/Stepsformhandling"><title className={this.state.titleCtrl}>Steps Form Handling</title></Link></li>
              </ul>
              : null}
          </li>
          <li><Link className={this.state.selectedMenu === 'item3' ? 'active' : ''} onClick={() => this.menuSelected("item3")}>
          <i className="icon-support"></i><title className={this.state.titleCtrl}>Custom Components</title>
          <img src={this.state.selectedMenu === 'item3' ? 'assets/images/icon2.png' : 'assets/images/icon1.png'} alt="" /></Link>
            {this.state.selectedMenu === 'item3' ?
              <ul>
                <li><Link to="/Icons"><title className={this.state.titleCtrl}>Icons</title></Link></li>
                <li><Link to="/Portlate"><title className={this.state.titleCtrl}>Portlates</title></Link></li>
                <li><Link to="/Messages"><title className={this.state.titleCtrl}>Messages</title></Link></li>
                <li><Link to="/Buttons"><title className={this.state.titleCtrl}>Buttons</title></Link></li>
                <li><Link to="/Tabs"><title className={this.state.titleCtrl}>Tabs</title></Link></li>
                <li><Link to="/Modalexample"><title className={this.state.titleCtrl}>Modal</title></Link></li>
                <li><Link to="/Tooltipexample"><title className={this.state.titleCtrl}>Tooltip</title></Link></li>
                <li><Link to="/Progressbarcustom"><title className={this.state.titleCtrl}>Progressbar </title></Link></li>
                <li><Link to="/Form"><title className={this.state.titleCtrl}>Forms</title></Link></li>
              </ul>
              : null}
          </li>
          <li><Link className={this.state.selectedMenu === 'item4' ? 'active' : ''} onClick={() => this.menuSelected("item4")}>
          <i className="icon-layers"></i><title className={this.state.titleCtrl}>Third Party Components</title>
          <img src={this.state.selectedMenu === 'item4' ? 'assets/images/icon2.png' : 'assets/images/icon1.png'} alt="" /></Link>
            {this.state.selectedMenu === 'item4' ?
              <ul>
                <li><Link to="/Charts"><title className={this.state.titleCtrl}>Charts</title></Link></li>
                <li><Link to="/Datatable"><title className={this.state.titleCtrl}>Data Table</title></Link></li>
                <li><Link to="/Switchbutton"><title className={this.state.titleCtrl}>Switch Button</title></Link></li>
                <li><Link to="/Progressbar"><title className={this.state.titleCtrl}>Progress Bar</title></Link></li>
                <li><Link to="/Ratingstar"><title className={this.state.titleCtrl}>Star Ratings</title></Link></li>
                <li><Link to="/Scrollbar"><title className={this.state.titleCtrl}>Scrollbar</title></Link></li>
                <li><Link to="/Datetimepicker"><title className={this.state.titleCtrl}>Datetime Picker</title></Link></li>
                <li><Link to="/Reactseletc"><title className={this.state.titleCtrl}>React Seletc </title></Link></li>
                <li><Link to="/Checkboxradiobutton"><title className={this.state.titleCtrl}>Checkbox Radio Button</title></Link></li>
                <li><Link to="/Treemenu"><title className={this.state.titleCtrl}>Tree Menu</title></Link></li>
                <li><Link to="/Qrcode"><title className={this.state.titleCtrl}>QR Code</title></Link></li>
              </ul>
              : null}
          </li>
        </ul>
      </div>
    );
  }
}

export default Menu;




