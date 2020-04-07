import React, { Component } from 'react';

class Radiocomponent extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <label
                className={this.props.radioClass}>
                <input
                    type="radio"
                    name={this.props.radioName}
                    value={this.props.radioValue}
                    disabled={this.props.radioDisabled}
                    onChange={this.props.radioHandle.bind(this) }
                />
                {this.props.radioLable}</label>
        );
    }
}

export default Radiocomponent;