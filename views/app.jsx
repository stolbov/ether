var React = require('react');

var Map = require('./map');
var ControlPanel = require('./controlPanel');

var App = React.createClass({
    updateDimensions: function() {
        var myWidth, myHeight;
        if (typeof (window.innerWidth) == 'number') {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else {
            if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                    myWidth = document.documentElement.clientWidth;
                    myHeight = document.documentElement.clientHeight;
            } else {
                if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                    myWidth = document.body.clientWidth;
                    myHeight = document.body.clientHeight;
                }
            }
        }        
        this.setState({width: myWidth, height: myHeight});
    },
    componentWillMount: function() {
        this.updateDimensions();
    },
    componentDidMount: function() {
        window.addEventListener("resize", this.updateDimensions);
    },
    componentWillUnmount: function() {
        window.removeEventListener("resize", this.updateDimensions);
    },
    render: function(){
        return (
            <div>
                <Map />
                <ControlPanel 
                    windowWidth = {this.state.width} 
                    windowHeight = {this.state.height}
                    topMargin = '80'
                    leftMargin = '10'
                />
            </div>
        );
    }
});

module.exports = App;