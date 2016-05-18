/**
 * Created by zc1415926 on 2016/3/22.
 */
/**
 * Created by zc1415926 on 2016/3/16.
 */
"use strict";

var React = require('react');
var ipc = window.require('electron').ipcRenderer;
var ExcelStore = require('../../stores/excelStore');
var XlsxHeaderDropdown = require('./partials/xlsxHeaderDropdown');
var _ = require('lodash');

var ExcelRenamer = React.createClass({

    getInitialState: function () {
        return {
            xlsxPath: '',
            dirPath: '',
            xlsxSourceData: '',

            sourceHeader: '',
            targetHeader: '',
        };
    },

    componentDidMount: function () {
        document.querySelector('#open-doc').addEventListener('click', function() {
            ipc.send('open-doc');
        });

        document.querySelector('#renamer-open-file').addEventListener('click', function () {
            ipc.send('renamer-open-file');
        });

        document.querySelector('#renamer-open-dir').addEventListener('click', function () {
            ipc.send('renamer-open-dir');
        });

        ipc.on('renamer-open-file-reply', function(event, sourceData){

            var tempXlsxPath = sourceData[sourceData.length-1];
            sourceData.pop();

            this.setState({
                xlsxPath: tempXlsxPath,
                xlsxSourceData: sourceData
            });
        }.bind(this));

        ipc.on('dir-path-reply', function(event, dirPath){
            this.getDirPath(dirPath);
        }.bind(this));
    },

    getXlsxPath: function (xlsxPath, event) {
        this.setState({
            xlsxPath: xlsxPath
        });
    },

    getDirPath: function (dirPath, event) {
        this.setState({
            dirPath: dirPath
        });
    },

    getRenameParams: function(paramObj){
        //console.log(paramObj);
        this.setState(paramObj);
    },

    onDoRenameClicked: function(xlsxPath, sourceHeader, targetHeader, dirPath, xlsxSourceData){
        console.log(ExcelStore.getRenamePairArray(sourceHeader, targetHeader, xlsxSourceData));
        ipc.send('renamer-do-rename', ExcelStore.getRenamePairArray(sourceHeader, targetHeader, xlsxSourceData), dirPath);

    },

    render: function () {
        return (
            <div className="container">

                <div className="jumbotron">
                    <h1>批量重命名</h1>
                    <p>根据Excel文件中的信息，批量重命名你的文件。<a id="open-doc" className="btn btn-link">详见文档</a></p>

                    <div className="control">
                        <button id="renamer-open-file" className="btn btn-primary btn-open-dialog">打开文件</button>
                        <code>{this.state.xlsxPath}</code>
                    </div>
                    
                    <XlsxHeaderDropdown headerData={this.state.xlsxSourceData[0]} callbackParent={this.getRenameParams}/>

                    <div className="control">
                        <button id="renamer-open-dir" className="btn btn-primary btn-open-dialog">打开文件夹</button>
                        <code>{this.state.dirPath}</code>
                    </div>

                    <div className="control">
                        <button id="renamer-do-rename" className="btn btn-danger btn-lg btn-open-dialog"
                                onClick={this.onDoRenameClicked.bind(
                                        this,
                                        this.state.xlsxPath,
                                        this.state.sourceHeader,
                                        this.state.targetHeader,
                                        this.state.dirPath,
                                        this.state.xlsxSourceData)}>开始重命名</button>
                    </div>
                </div>
            </div>
        );
    },
});

module.exports = ExcelRenamer;