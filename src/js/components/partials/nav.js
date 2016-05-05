/**
 * Created by zc1415926 on 2016/3/16.
 */
"use strict";

var React = require('react');
var Nav = React.createClass({
    render: function () {
        return (

            <nav id="navbar-space" className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Excel 转换</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#/">主页</a></li>
                            <li className=""><a href="#/renamer">Excel 重命名</a></li>
                            <li className=""><a href="#/excelConverter">Excel 转换</a></li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                   aria-haspopup="true"
                                   aria-expanded="false">Dropdown <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">Action</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li className="dropdown-header">Nav header</li>
                                    <li><a href="#">Separated link</a></li>
                                </ul>
                            </li>
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