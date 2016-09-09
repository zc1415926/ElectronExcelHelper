/**
 * Created by zc1415926 on 2016/3/16.
 */
"use strict";

var React = require('react');
var Link = require('react-router').Link;
var NavTab = require('./navTab');

var Nav = React.createClass({
    componentDidMount: function () {
        document.querySelector('#closeMainWindow').addEventListener('click', function(){
            ipc.send('closeMainWindow');
        });
    },

    render: function () {
        return (
            <nav id="navbar-space" className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">Excel 转换</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <NavTab to="/" onlyActiveOnIndex={true}>主页</NavTab>
                            <NavTab to="/renamer">文件批量重命名</NavTab>
                            <NavTab to="/converter">课表转换</NavTab>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a id="closeMainWindow" className="glyphicon glyphicon-remove"></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = Nav;