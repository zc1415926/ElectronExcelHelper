/**
 * Created by zc1415926 on 2016/3/16.
 */
$ = jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Home = require('./components/homePage');
var Nav = require('./components/partials/nav');
//var About = require('./components/about/aboutPage');
//var Header = require('./components/common/header');
//var ExcelConverter = require('./components/excelConverter/index');

var MainRouter = require('./components/router');

ReactDOM.render((
    <div>
        <Nav />
        <MainRouter />
    </div>

), document.getElementById('app'));