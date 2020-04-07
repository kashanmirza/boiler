import React, { Component } from 'react';

class Selectcomponent extends React.Component {

    constructor() {
        super();
        this.state = {
            selectData: [],

        }
    }

    componentDidMount() {
        var selectData;
        if (this.props.data == null) {
            selectData = []
        }
        else {
            selectData = this.props.data;
        }
        this.setState({ selectData: selectData });
    }

    componentDidUpdate() {
        var selectData;
        if (this.state.selectData.length != this.props.data.length) {
            selectData = this.props.data;
            this.setState({ selectData: selectData });
        }
    }

    render() {

        let dropDownOption = this.state.selectData.map((item, index) => (
            <option
                key={index.toString()}
                id={item.id}
                label={item.lable}
                value={item.value}>
            </option>
        ));

        return (
            <div className="customFormGroup clearfix">
                <label>{this.props.selectLable}</label>
                <div>
                    <select
                        name={this.props.selectName}
                        className={this.props.selectCalssName}
                        id={this.props.selectID}
                        value={this.state.selectValue}
                        onChange={this.props.selectHandle.bind(this)}>
                        {dropDownOption}
                    </select>
                </div>
            </div>
        );
    }
}

export default Selectcomponent;







// use this Component

// <Selectcomponent
// selectName="selectedValue"
// selectLable="Select Country"
// selectCalssName="form-control"
// selectID=""
// data={this.state.selectCountry}
// selectValue={this.state.selectedValue}
// selectHandle={e => this.handleChange(e)} />