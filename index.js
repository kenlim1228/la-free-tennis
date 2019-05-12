var map, currentLocationMarker, currentInfoWindow, bounds;
var laPosition = { lat: 34.052235, lng: -118.243683 };

function drawMarkers() {
    bounds = new google.maps.LatLngBounds();
    locations.forEach(function(obj) {
        var marker = new google.maps.Marker({
            map: map,
            title: obj.title,
            position: obj.position
        });
        bounds.extend(marker.getPosition());
        var infoWindow = new google.maps.InfoWindow({
            content:
                '<div style="text-align: left;">LA Parks Info Page: <a href="' +
                obj.url +
                '" target="_blank">' +
                obj.name +
                '</a>' +
                '<br /><br />' +
                '<a href=https://www.google.com/maps/search/' +
                encodeURIComponent(obj.name) +
                '/' +
                encodeURIComponent(obj.address) +
                ' target="_blank">Google Maps Direction</a></div>'
        });
        marker.addListener('click', function() {
            if (currentInfoWindow) {
                currentInfoWindow.set('marker', null);
                currentInfoWindow.close();
            }
            infoWindow.open(map, marker);
            currentInfoWindow = infoWindow;
        });
    });
    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);
}

function getCurrentPosition() {
    // Try geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            currentLocationMarker.setPosition(pos);
            map.setCenter(bounds.getCenter());
            map.fitBounds(bounds);
        });
    }
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: laPosition
    });
    currentLocationMarker = new google.maps.Marker({
        map: map,
        position: laPosition,
        icon: 'bluedot.png'
    });
}

$(document).ready(function(e) {
    $('#map').css('height', window.innerHeight - 100);
    initMap();
    drawMarkers();
    getCurrentPosition();
});
