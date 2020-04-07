import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home/home';
import Profile from  './User/Profile' ;
import history from '../History';

class Master extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div>
                  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="navbar-nav mr-auto">
                            <li><Link to={'/home'} className="nav-link"> Home </Link></li>
                            <li><Link to={'/Profile'} className="nav-link">Profile</Link></li>
                        </ul>
                    </nav>

                <div className="App-header" >
                    <div>
                        {/* <h1> UserName : {this.props.user.UserName}</h1> */}

                    </div>
                    {/* <Profile/> */}
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <h2>Welcome to React</h2>
                    <h2>Welcome to React Router Tutorial</h2>
                   

                </div>

               

          

            </div>
        )
    }
}

export default Master;