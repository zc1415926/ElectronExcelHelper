/**
 * Created by zc1415926 on 2016/3/22.
 */
/**
 * Created by zc1415926 on 2016/3/16.
 */
"use strict";

var React = require('react');
var ipc = window.require('electron').ipcRenderer;

var ExcelConverter = React.createClass({

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

    render: function () {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>学校总课表转换</h1>
                    <p>将学校总课表分解为符合第一范式的表格，方便其他系统导入数据。</p>
                    <p>
                        <button id="converter-open-rhjxx" className="btn btn-primary btn-open-dialog">打开人和街课表并转换</button>
                    </p>
                    <p>
                        <button id="converter-open-tdRhjxx" className="btn btn-primary btn-open-dialog">打开天地课表并转换</button>
                    </p>
                </div>


            </div>
        );
    }
});

module.exports = ExcelConverter;