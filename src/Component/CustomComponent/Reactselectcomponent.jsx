import React, { Component } from 'react';

class Reactselectcomponent extends React.Component {

    constructor() {
        super();
        this.state = {
            //rcSelectList: []

        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="customFormGroup clearfix">
                <label>{this.props.rcSelectLable}</label>
                <select
                    className={this.props.rcSelectCalss}
                    onChange={this.props.rcSelectFunc.bind(this)}
                    value={this.props.rcSelectVal}
                    id={this.props.rsSelectID}
                    name={this.props.rcSelectNam}>
                    {this.props.rcSelectList.map((item, index) => {
                        return <option
                            key={index.toString()}
                            value={item.value}>{item.lable}</option>;
                    })
                    }
                </select>
            </div>
        );
    }
}

export default Reactselectcomponent;