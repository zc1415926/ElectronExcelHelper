/**
 * Created by zc1415926 on 2016/3/16.
 */
$ = jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;
var IndexRoute = require('react-router').IndexRoute;

var Home = require('./components/homePage/index');


ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={require('./app')}>
            <IndexRoute component={Home}/>
            <Route path="/home" component={Home}/>
            <Route path="/renamer" component={require('./components/excelRenamer/index')}/>
            <Route path="/converter" component={require('./components/excelConverter/index')}/>
        </Route>
    </Router>
), document.getElementById('app'));