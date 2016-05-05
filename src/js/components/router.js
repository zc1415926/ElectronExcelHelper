/**
 * Created by zc1415926 on 2016/5/5.
 */
'use strict';

var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;
//var abc = require('./components/excelRenamer/excelRenamer');
var router = React.createClass({
    render: function () {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={require('./homePage')}/>
                <Route path="/renamer" component={require('./excelRenamer/index')}/>
            </Router>
        );
    }});

module.exports = router;