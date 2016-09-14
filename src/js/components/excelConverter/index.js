/**
 * Created by zc1415926 on 2016/3/22.
 */
/**
 * Created by zc1415926 on 2016/3/16.
 */
"use strict";

var React = require('react');
var ipc = window.require('electron').ipcRenderer;
var RhjxxDescribeModal = require('./partials/rhjxxDescribeModal');
var TdRhjxxDescribeModal = require('./partials/tdRhjxxDescribeModal');

var ExcelConverter = React.createClass({

    getInitialState: function () {
        return {
            isRhjxxDescribeModalOpen: false,
            isTdRhjxxDescribeModalOpen: false,
        };
    },

    componentDidMount: function () {
        document.querySelector('#converter-open-tdRhjxx').addEventListener('click', function () {
            ipc.send('converter-open-tdRhjxx');
        });

        document.querySelector('#converter-open-rhjxx').addEventListener('click', function () {
            ipc.send('converter-open-rhjxx');
        });

        ipc.on('converter-open-tdRhjxx-reply', function(event, filePath){
            ipc.send('converter-tdRhjxx-message', filePath);
        }.bind(this));

        ipc.on('converter-tdRhjxx-message-repaly-save-as', function(event, filePath){
            ipc.send('converter-tdRhjxx-save-to-dir', filePath);
        }.bind(this));
    },

    openRhjxxDescribeModal: function () {
        this.setState({isRhjxxDescribeModalOpen: true});
    },

    closeRhjxxDescribeModal: function () {
        this.setState({isRhjxxDescribeModalOpen: false});
    },

    openTdRhjxxDescribeModal: function () {
        this.setState({isTdRhjxxDescribeModalOpen: true});
    },

    closeTdRhjxxDescribeModal: function () {
        this.setState({isTdRhjxxDescribeModalOpen: false});
    },

    render: function () {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>学校总课表转换</h1>
                    <p>将学校总课表分解为符合第一范式的表格，方便其他系统导入数据。</p>
                    <p>
                        <button id="converter-open-rhjxx" className="btn btn-primary btn-open-dialog">打开人和街课表并转换</button>
                        <button className="btn btn-link" onClick={this.openRhjxxDescribeModal}>
                            <span className="glyphicon glyphicon-info-sign"></span></button>
                    </p>
                    <p>
                        <button id="converter-open-tdRhjxx" className="btn btn-primary btn-open-dialog">打开天地课表并转换</button>
                        <button className="btn btn-link" onClick={this.openTdRhjxxDescribeModal}>
                            <span className="glyphicon glyphicon-info-sign"></span></button>
                    </p>
                </div>

                <RhjxxDescribeModal isOpen={this.state.isRhjxxDescribeModalOpen}
                                    closeModal={this.closeRhjxxDescribeModal}/>
                <TdRhjxxDescribeModal isOpen={this.state.isTdRhjxxDescribeModalOpen}
                                      closeModal={this.closeTdRhjxxDescribeModal}/>
            </div>
        );
    }
});

module.exports = ExcelConverter;