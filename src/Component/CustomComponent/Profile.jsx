
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Profile extends Component {
    contentStyle = {
        fontSize: 30, background: '#0c7f9e',
        width: '80px', height: '50px',
        borderRadius: '60%', paddingTop: '1%'

    };    
    render() {
        return (
            <div>
                <div style={this.contentStyle} >  {this.props.user.IntialName}  </div>
                
            </div>
        )
    }
}


function mapStateToProps(state) {
    return ({
        user: state.reducerUser.user
    })
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({

    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);