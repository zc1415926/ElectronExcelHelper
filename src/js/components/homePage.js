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
                    <h1>Excel转换</h1>
                    <p>这里展示了官方文档中列出的5种可以调用的对话框。<a className="btn btn-link" href="http://electron.atom.io/docs/v0.37.2/api/dialog/">详见文档</a></p>
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