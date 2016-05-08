/**
 * Created by zc1415926 on 2016/3/22.
 */
/**
 * Created by zc1415926 on 2016/3/16.
 */
"use strict";

var React = require('react');
var ExcelRenamer = React.createClass({

    componentDidMount: function () {
        document.querySelector('#open-doc').addEventListener('click', function() {
            ipc.send('open-doc');
        });
        document.querySelector('#open-file').addEventListener('click', function () {
            ipc.send('open-file');
        });
    },

    render: function () {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>批量重命名</h1>
                    <p>这里展示了官方文档中列出的5种可以调用的对话框。<a id="open-doc" className="btn btn-link">详见文档</a></p>
                    <p>
                        <button id="open-file" className="btn btn-primary btn-open-dialog">打开文件</button>

                    </p>
                </div>


            </div>
        );
    },
});

module.exports = ExcelRenamer;