/* global L */

var maps = {};

module.exports.createMap = function (name, htmlElement, initialMapView) {
    var map = L.map(htmlElement, {
        maxZoom: 19
    }).setView(initialMapView.center, initialMapView.zoom);

    maps[name] = map;

    return map;
};

module.exports.getMap = function (name) {
    if (name) {
        return maps[name];
    } else {
        return maps['default'];
    }
};
