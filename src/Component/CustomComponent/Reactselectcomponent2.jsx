import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import Textinputcomponent from '../customComponent/Textinputcomponent';
import Useravatar from '../customComponent/Useravatar';

class Reactselectcomponent2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: [],
            menuOpen: false,
            search: "",

        }
    }

    menuClickOutside = event => {
        const domNode = ReactDOM.findDOMNode(this);
        if (!domNode || !domNode.contains(event.target)) {
            this.setState({
                menuOpen: false
            });
        }
    }

    componentWillUnmount() {

        document.removeEventListener('click', this.menuClickOutside, true);
    }

    componentDidMount() {

        document.addEventListener('click', this.menuClickOutside, true);

        var dataList;
        if (this.props.data == null) {
            dataList = []
        }
        else {
            dataList = this.props.data;
        }
        this.setState({ dataList: dataList });

    }

    openAccountMenu() {
        this.setState({
            menuOpen: !this.state.menuOpen,
        })
    }

    searchAccount(e) {
        this.setState({
            search: e.target.value.substr(0.20)
        })
    }



    render() {

        let filterList = this.props.dataList.filter(
            (list) => {
                return list.accountTitle.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        return (
            <div className="dataDropdown clearfix">
                <a href="javascript:;" className="dataDropdownAnchor" onClick={() => this.openAccountMenu()}><i className={this.state.menuOpen ? 'icon-arrow-up' : 'icon-arrow-down'}></i></a>
                {this.props.currentAccountSelected != undefined ?
                    <div className="selectAccount clearfix">
                        <img src={this.props.currentAccountSelected.accountImg} alt="" />
                        <p>{this.props.currentAccountSelected.accountTitle}</p>
                        <p>{this.props.currentAccountSelected.accountNumber}</p>
                        <p>{this.props.currentAccountSelected.accountBalance}</p>
                    </div>
                    : null}
                {this.state.menuOpen ?
                    <div className="dataDropdownContent">
                        <Textinputcomponent
                            inputLable="Search Account"
                            inputPlaceholder="Search Here"
                            inputName=""
                            inputType="text"
                            inputValue={this.state.search}
                            inputDisabled={false}
                            inputCalssName="form-control input-sm"
                            inputID=""
                            inputHandle={e => this.searchAccount(e)}
                        />
                        <Scrollbars style={{ height: 200 }}>
                            {filterList.map((item, index) => (
                                <a onClick={() => this.props.selectCurrentAccount(item)} href="javascript:;" key={index.toString()} className="dataDropdownList clearfix">
                                    <div className="avatarName"><Useravatar Useravatarname={item.accountTitle} /></div>
                                    <p>{item.accountTitle}</p>
                                    <p>{item.accountNumber}</p>
                                    <p>{item.accountBalance}</p>
                                    <p>{item.accountNik}</p>
                                </a>
                            ))}
                        </Scrollbars>
                    </div>
                    : null}
            </div>
        );
    }
}

export default Reactselectcomponent2;











// componentDidMount() {
//     var selectData;
//     if (this.props.data == null) {
//         selectData = []
//     }
//     else {
//         selectData = this.props.data;
//     }
//     this.setState({ selectData: selectData });
// }

// componentDidUpdate() {
//     var selectData;
//     if (this.state.selectData.length != this.props.data.length) {
//         selectData = this.props.data;
//         this.setState({ selectData: selectData });
//     }
// }



