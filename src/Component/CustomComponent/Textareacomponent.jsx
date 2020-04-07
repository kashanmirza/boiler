import React, { Component } from 'react';

class Textareacomponent extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {

        return (
            <div className="customFormGroup clearfix">
                <label>{this.props.textareaLable}</label>
                <div>
                    <textarea
                        name={this.props.textareaName}
                        disabled={this.props.textareaDisabled}
                        value={this.props.textareaValue}
                        placeholder={this.props.textareaPlaceholder}
                        className={this.props.textareaCalssName}
                        rows={this.props.textareaRows}
                        cols={this.props.textareaCols}
                        onChange={this.props.textareaHandle.bind(this)}
                        id={this.props.textareaID}>
                    </textarea>
                </div>
            </div>
        );
    }
}

export default Textareacomponent;