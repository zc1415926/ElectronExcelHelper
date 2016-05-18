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
                </div>
            </div>
        );
    }
});

module.exports = Home;