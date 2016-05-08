/**
 * Created by ZC on 2016/5/8.
 */
var React = require('react'),
    Link = require('react-router').Link;

var NavTab = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render: function () {
        var isActive = this.context.router.isActive(this.props.to, this.props.params, this.props.query);
        var className = isActive ? 'active' : '';
        return <li className={className}> <Link {...this.props} /></li>;
    }
});

module.exports = NavTab;