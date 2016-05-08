/**
 * Created by ZC on 2016/5/8.
 */
"use strict";

var React = require('react');
var Nav = require('./components/partials/nav');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <Nav/>
                {this.props.children}
            </div>
        );
    }
});

module.exports = App;