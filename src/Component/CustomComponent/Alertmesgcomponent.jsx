import React, { Component } from 'react';
// import logo from '../logo.svg';

class Alertmesgcomponent extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {

        return (
            <div>
                <div className={this.props.messageClassName}> <strong>{this.props.messageTitle}</strong> {this.props.messageDescription}</div>
            </div>
        );
    }
}

export default Alertmesgcomponent;