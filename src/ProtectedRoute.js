
import React, { Component } from 'react';
import { withRouter,Route, Redirect } from "react-router-dom";
import Auth from "./Utils/Auth";
import action from './store/Actions/Index'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {


   
    let isAuthenticated = Auth.CurrentUser().isAuthenticated;
   
    if(isAuthenticated !== true){
        console.log("Session Expire --Login screen")
        //Auth.Logout();
       // this.props.onLogout();
    }
    return (
        <Route
            {...rest}
            render={props => {
               
                if (isAuthenticated === true) {
                    return <Component {...props} />;
                }
                else {
                    return <Redirect to="/" />
                    // return this.props.onLogout().then(
                    //     (res) => {  <Redirect to="/" /> });  
                                        // this.props.onLogout();   
                                   //     to={{ pathname: '/', state: { from: props.location } }}                 
                }
            }}
        />
    );
}

 //export default ProtectedRoute;

// function mapDispatchToProps(dispatch) {

//     return bindActionCreators({
//         logout : logout,
//     }, dispatch);
// // }

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch (action.logout())
    };
};
export default withRouter(connect(null, mapDispatchToProps)(ProtectedRoute));
