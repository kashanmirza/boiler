import React from 'react';

class Anchorcomponent extends React.Component {
    constructor() {
        super();
        this.invokeAnchorButton = this.invokeAnchorButton.bind(this);
    }

    invokeAnchorButton() {
        this.props.invokeAnchorButtonhandlar(this.props.rowData);
    }

    render() {
        return (
            <div>
                <a href="javascript:;" onClick={this.invokeAnchorButton}>{this.props.anchotDisplayName}</a>
            </div>
        );
    }
}

export default Anchorcomponent;

