/**
 * Created by zc1415926 on 2016/3/16.
 */
"use strict";

var React = require('react');

var Home = React.createClass({

    render: function(){
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Excel实用工具</h1>
                    <p>更高效地利用您的Excel文件，提速您的办公流程。<a id="open-doc" className="btn btn-link" onclick="onOpenDocClicked">详见文档</a></p>
                    <p>
                        <button id="open-file" className="btn btn-primary btn-open-dialog">打开文件</button>
                        <button id="open-dir" className="btn btn-primary btn-open-dialog">打开文件夹</button>
                        <button id="save-file" className="btn btn-primary btn-open-dialog">保存文件</button>
                        <button id="msg-box" className="btn btn-primary btn-open-dialog">弹出对话框</button>
                        <button id="err-box" className="btn btn-primary btn-open-dialog">报错对话框</button>
                    </p>
                </div>


            </div>
        );
    }
});

module.exports = Home;