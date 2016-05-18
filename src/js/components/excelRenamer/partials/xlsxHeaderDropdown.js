/**
 * Created by ZC on 2016/5/14.
 */
'use strict';
var React = require('react');

var XlsxHeaderDropdown = React.createClass({
    getInitialState: function () {
        return {
            headerData: [],
            sourceButtonText: '原文件名列',
            targetButtonText: '目标文件名列'
        };
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        return this.state.headerData = nextProps.headerData;
    },

    setSourceHeader: function (header, event) {

        this.props.callbackParent({sourceHeader: header});

        this.setState({
            sourceButtonText: '原文件名列: ' + header
        });
    },

    setTargetHeader: function (header, event) {

        this.props.callbackParent({targetHeader: header});

        this.setState({
            targetButtonText: '目标文件名列: ' + header
        });
    },

    createSourceHeaderDropdown: function (header) {
        return (
            <li><a onClick={this.setSourceHeader.bind(this, header)}>{header}</a></li>
        );
    },

    createTargetHeaderDropdown: function (header) {
        return (
            <li><a onClick={this.setTargetHeader.bind(this, header)}>{header}</a></li>
        );
    },

    render: function(){
        return(
            <div>
                <div className="btn-group">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">{this.state.sourceButtonText} <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                        {this.state.headerData.map(this.createSourceHeaderDropdown, this)}
                    </ul>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">{this.state.targetButtonText} <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                        {this.state.headerData.map(this.createTargetHeaderDropdown, this)}
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = XlsxHeaderDropdown;