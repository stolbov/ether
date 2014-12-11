var React = require('react');
var MapRepo = require('../src/js/lib/mapCreate');
var osmBasemap = require('../src/js/lib/osmBasemap');

var Map = React.createClass({
    componentDidMount: function () {
        var node = this.getDOMNode();
        var map = MapRepo.createMap('defaulp', node, {center: [56.123578,47.239479], zoom: 10});
        osmBasemap(map);
    },
    render: function(){
        return (
            <div>
            </div>
        );
    }
});

module.exports = Map;