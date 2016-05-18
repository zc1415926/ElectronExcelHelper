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
        //var currentPathName = this.context.router.getCurrentPathname();
        //window.console.log(this.props);
        var isRootPath = this.context.router.isActive({ pathname: '/'}, true);
        //window.console.log('isRootPath');
        //window.console.log(isRootPath);
var className = '';
        /*if(isRootPath){
            if(this.props.to == '/'){
                window.console.log('root root');

                var className = isActive ? 'active' : '';
            }else {
                window.console.log('root other');
            }
        }else{
            var className = isActive ? 'active' : '';
        }*/

        if(this.props.to == '/'){
            if(isRootPath){
                className = 'active';
            }else{
                //className = isActive ? 'active' : '';
            }
        }else{
            if(isRootPath){
                className = '';
            }else{
                //className = isActive ? 'active' : '';
            }
        }
        window.console.log('className');
        window.console.log(this.className);
        return <li className={className}> <Link {...this.props} /></li>;
    }
});

module.exports = NavTab;