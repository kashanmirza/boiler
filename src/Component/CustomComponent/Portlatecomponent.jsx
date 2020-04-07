import React, { Component } from 'react';

class PortlateComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            collapseResult: true,
            collapseArrow: true,
            portalExtend: true,
            reloadResult: false,
            deletePortlate: true
        }
    }

    portlateCollapse() {
        this.setState({ collapseResult: !this.state.collapseResult });
        this.setState({ collapseArrow: !this.state.collapseArrow });
    }

    portlateHide() {
        this.setState({ deletePortlate: false });
    }

    portlateReload() {
        this.setState({ reloadResult: !this.state.reloadResult });
        setTimeout(function () {
            this.setState({ reloadResult: false });
        }.bind(this), 1500)
    }

    portlateResize() {
        this.setState({ portalExtend: !this.state.portalExtend });
    }

    render() {

        var icon = this.state.collapseArrow ? '../assets/images/down.png' : '../assets/images/up.png';

        const res1 = this.state.collapseResult ? 'portletBody' : 'data-hide';

        const remove = this.state.deletePortlate ? '' : 'data-hide';

        const reload = this.state.reloadResult ? 'portletMask' : 'data-hide';

        const resizeprt = this.state.portalExtend ? 'portletContainer' : 'fullscreen';

        return (
            <div>
                <div className={this.props.portlatewidth}> 
                    <div className={remove}>
                        <div className={resizeprt}>
                            <div className={reload}>
                                <div className="portlet-loader">Loading...</div>
                            </div>
                            <div className="portletTitle">
                                <h2><i className={this.props.titleicon}></i>{this.props.portlatetitle}</h2>
                                <a href="javascript:;" className="portletOpen" onClick={this.portlateCollapse.bind(this)}><img src={icon} alt="" /></a>
                                <a href="javascript:;" className="portletResize" onClick={this.portlateResize.bind(this)}></a>
                                <a href="javascript:;" className="portletClose" onClick={this.portlateHide.bind(this)}></a>
                                <a href="javascript:;" className="portletRefresh" onClick={this.portlateReload.bind(this)}></a> </div>
                            <div className={res1}>
                                {this.props.portlateContant}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PortlateComponent;