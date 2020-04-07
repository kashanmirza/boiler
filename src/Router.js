import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './Component/Home/home';
import About from './Component/Home/about';
import Practice from './Component/Practice'
import createBrowserHistory from 'history/createBrowserHistory'
import logo from './logo.svg';
import Profile from './Component/CustomComponent/Profile';

//import history from './History';
import Login from './Component/User/Login';

//import Login from './Component/Login';
const history = createBrowserHistory()

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                       {/* <div className="App-header">
                        <Profile/>
                            <img src={logo} className="App-logo" alt="logo" />
                            <h2>Welcome to React</h2>

                            <Route exact path="/" component={Home} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/Practice" component={Practice} /> */}
                        <Route exact path="/" component={Home} />
                        <Login/>
                   
                </div>
            </Router>
        )
    }
}

export default Routers;