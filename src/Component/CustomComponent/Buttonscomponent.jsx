import React, { Component } from 'react';

class Buttonscomponent extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {

        return (
            <div>
                <button
                    onClick={() => this.props.buttonFunction()}
                    type={this.props.btnType}
                    disabled={this.props.buttonDisabled}
                    className={this.props.btnCalss}>
                    {this.props.btnTitle}</button>
            </div>
        );
    }
}

export default Buttonscomponent;