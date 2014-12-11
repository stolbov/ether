/* global L */

module.exports = function (map) {
    L.tileLayer('http://gwosm.cloudapp.net/osm/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OSM</a> contributors',
        maxZoom: 19
    }).addTo(map);
};