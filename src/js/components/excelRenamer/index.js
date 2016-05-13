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

var ExcelRenamer = React.createClass({

    getInitialState: function () {
        return {
            xlsxPath: '',
            dirPath: '',
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
             //   this.getXlsxPath(xlsxPath);
            console.log(sourceData[0]);
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

    render: function () {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>批量重命名</h1>
                    <p>根据Excel文件中的信息，批量重命名你的文件。<a id="open-doc" className="btn btn-link">详见文档</a></p>

                    <button id="renamer-open-file" className="btn btn-primary btn-open-dialog">打开文件</button>
                    <h5>{this.state.xlsxPath}</h5>

                    <button id="renamer-open-dir" className="btn btn-primary btn-open-dialog">打开文件夹</button>
                    <h5>{this.state.dirPath}</h5>
                </div>
            </div>
        );
    },
});

module.exports = ExcelRenamer;