import React, { Component } from 'react';

class Tabscomponent extends React.Component {

    constructor() {
        super();
        this.state = {
            selectTabData: 0,
            tabData: [],
        }
    }

    componentDidMount() {

        var tabData;
        if (this.props.data == null) {
            tabData = [
                // { id: 0, tabname: 'tab1', description: 'dummy data tab1' },
                // { id: 1, tabname: 'tab2', description: 'dummy data tab2' },
                // { id: 2, tabname: 'tab3', description: 'dummy data tab3' },
                // { id: 3, tabname: 'tab4', description: 'dummy data tab4' }
            ]
        }
        else {
            tabData = this.props.data;
        }
        this.setState({
            tabData: tabData,
            currentDescription: tabData[0].description,
            currentDescriptionTitle: tabData[0].descriptionTitle,
        });

    }

    clickTabData(index, id) {
        this.setState({ selectTabData: id });
        this.setState({ currentDescription: this.state.tabData[index].description });
        this.setState({ currentDescriptionTitle: this.state.tabData[index].descriptionTitle });
        console.log('select tab');
    }


    render() {

        return (
            <div>
                <div className="comTab">
                    <div className="comTabLeft">
                        {this.state.tabData.map((item, index) => (
                            <a key={index.toString()}
                                className={this.state.selectTabData === item.id ? 'comTabActive' : ''}
                                onClick={this.clickTabData.bind(this, index, item.id)}>{item.tabname}</a>
                        ))}
                    </div>
                    <div className="comTabRight">
                        <h6>{this.state.currentDescriptionTitle}</h6>
                        <p>{this.state.currentDescription}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tabscomponent;