var map, currentLocationMarker, currentInfoWindow, bounds;
var laPosition = { lat: 34.052235, lng: -118.243683 };
var locations = [
    {
        name: '109TH STREET RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/109th-street',
        address: '1464 E. 109th St., Los Angeles, CA 90059',
        position: { lat: 33.9366006, lng: -118.248962 }
    },
    {
        name: 'ALGIN SUTTON RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/algin-sutton',
        address: '8800 S. Hoover St., Los Angeles, CA 90044',
        position: { lat: 33.9572904, lng: -118.28637279999998 }
    },
    {
        name: 'ARROYO SECO PARK',
        url: 'https://www.laparks.org/park/hermon-park-arroyo-seco-park',
        address: '5566 Via Marisol St., Los Angeles, CA 90042',
        position: { lat: 34.1043927, lng: -118.18608340000003 }
    },
    {
        name: 'ARTHUR ASHE CENTER',
        url: 'https://www.laparks.org/sports/tennis/facility/arthur-ashe',
        address: '5001 Rodeo Rd., Los Angeles, CA 90016',
        position: { lat: 34.0218203, lng: -118.35034960000002 }
    },
    {
        name: 'BANNING RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/banning',
        address: '1331 Eubank St., Wilmington, CA 90744',
        position: { lat: 33.7906425, lng: -118.2566367 }
    },
    {
        name: 'BARRINGTON RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/barrington',
        address: '333 S Barrington Ave., Los Angeles, CA 90049',
        position: { lat: 34.0613296, lng: -118.46885470000001 }
    },
    {
        name: 'BRANFORD RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/branford',
        address: '13310 Branford St., Arleta, CA 91331',
        position: { lat: 34.232088, lng: -118.42298399999999 }
    },
    {
        name: 'DANIELS FIELD SPORTS CENTER',
        url: 'https://www.laparks.org/reccenter/daniels-field-sports',
        address: '845 W 12th St., San Pedro, CA 90731',
        position: { lat: 33.7331795, lng: -118.29497070000002 }
    },
    {
        name: 'EAGLE ROCK RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/eagle-rock',
        address: '1100 Eagle Vista Dr., Los Angeles, CA 90041',
        position: { lat: 34.1426646, lng: -118.18918380000002 }
    },
    {
        name: 'ECHO PARK RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/echo',
        address: '1632 Bellevue Ave., Los Angeles, CA 90026',
        position: { lat: 34.06976909999999, lng: -118.2600981 }
    },
    {
        name: 'EL SERENO RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/el-sereno',
        address: '4721 Klamath Place, Los Angeles, CA 90032',
        position: { lat: 34.0749638, lng: -118.18194490000002 }
    },
    {
        name: 'ENCINO PARK',
        url: 'https://www.laparks.org/park/encino',
        address: '16953 Ventura Blvd., Encino, CA 91316',
        position: { lat: 34.1597113, lng: -118.50262459999999 }
    },
    {
        name: 'GLASSELL PARK RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/glassellpark',
        address: '3650 Verdugo Rd., Los Angeles, CA 90065',
        position: { lat: 34.1159495, lng: -118.23349259999998 }
    },
    {
        name: 'GLEN ALLA PARK',
        url: 'https://www.laparks.org/park/glen-alla',
        address: '4601 Alla Rd., Los Angeles, CA 90292',
        position: { lat: 33.9859567, lng: -118.43225640000003 }
    },
    {
        name: 'GREEN MEADOWS RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/green-meadows',
        address: '431 E. 89th St., Los Angeles, CA 90003',
        position: { lat: 33.955907, lng: -118.2690945 }
    },
    {
        name: 'HAZARD RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/hazard',
        address: '2230 Norfolk St., Los Angeles, CA 90033',
        position: { lat: 34.0608548, lng: -118.20256949999998 }
    },
    {
        name: 'JACKIE TATUM / HARVARD RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/jackie-tatum-harvard',
        address: '1535 W 62nd St., Los Angeles, CA 90047',
        position: { lat: 33.9835064, lng: -118.3037736 }
    },
    {
        name: 'JIM GILLIAM RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/jim-gilliam',
        address: '4000 S, La Brea Ave., Los Angeles, CA 90008',
        position: { lat: 34.0130353, lng: -118.3545967 }
    },
    {
        name: 'JOHN QUIMBY PARK',
        url: 'https://www.laparks.org/park/quimby',
        address: '7008 De Soto Ave., Canoga Park, CA 91306',
        position: { lat: 34.1978349, lng: -118.58784029999998 }
    },
    {
        name: 'KNAPP RANCH',
        url: 'https://www.laparks.org/park/knapp-ranch',
        address: '25000 Kittridge St., West Hills, CA 91307',
        position: { lat: 34.1889458, lng: -118.66327460000002 }
    },
    {
        name: 'LAFAYETTE COMMUNITY CENTER',
        url: 'https://www.laparks.org/reccenter/lafayette-multipurpose-community',
        address: '625 S. Lafayette Pk., Los Angeles, CA 90057',
        position: { lat: 34.062064, lng: -118.28309239999999 }
    },
    {
        name: 'LAKEVIEW TERRACE RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/lake-view-terrace',
        address: '11075 Foothill Blvd., Lake Terrace, CA 91542',
        position: { lat: 34.2751124, lng: -118.37102099999998 }
    },
    {
        name: 'LANARK RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/lanark',
        address: '21816 Lanark St., Canoga Park, CA 91304',
        position: { lat: 34.2170853, lng: -118.60415260000002 }
    },
    {
        name: 'LINCOLN PARK RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/lincoln',
        address: '3501 Valley Blvd., Los Angeles, CA 90031',
        position: { lat: 34.0659459, lng: -118.20153800000003 }
    },
    {
        name: 'LOREN MILLER RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/loren-miller',
        address: '2717 Halldale Ave., Los Angeles, CA 90018',
        position: { lat: 34.0301682, lng: -118.3031603 }
    },
    {
        name: 'MAR VISTA RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/mar-vista',
        address: '11430 Woodbine Ave., Los Angeles, CA 90066',
        position: { lat: 34.0177096, lng: -118.4281674 }
    },
    {
        name: 'MONTECITO HEIGHTS RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/montecito-heights',
        address: '4545 Homer St., Los Angeles, CA 90031',
        position: { lat: 34.0957569, lng: -118.20326039999998 }
    },
    {
        name: 'NORTH HOLLYWOOD RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/north-hollywood',
        address: '5301 Tujunga Ave., North Hollywood, CA 91601',
        position: { lat: 34.1671344, lng: -118.37908010000001 }
    },
    {
        name: 'NORTHRIDGE RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/northridge',
        address: '18300 Lemarsh St., Northridge, CA 91325',
        position: { lat: 34.2541127, lng: -118.53263140000001 }
    },
    {
        name: 'OAKWOOD RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/oakwood',
        address: '767 California St., Venice, CA 90291',
        position: { lat: 33.9946705, lng: -118.46372200000002 }
    },
    {
        name: 'PANORAMA RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/panorama',
        address: '8600 Hazeltine Ave., Panorama City, CA 91402',
        position: { lat: 34.2274846, lng: -118.44168509999997 }
    },
    {
        name: 'PECK PARK COMMUNITY CENTER',
        url: 'https://www.laparks.org/park/peck',
        address: '560 N. Western Ave., San Pedro, CA 90732',
        position: { lat: 33.7510841, lng: -118.305879 }
    },
    {
        name: 'PENMAR RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/penmar',
        address: '1341 Lake St., Venice, CA 90291',
        position: { lat: 34.0065782, lng: -118.45558089999997 }
    },
    {
        name: 'QUEEN ANNE RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/queen-anne',
        address: '1240 West Blvd., Los Angeles, CA 90019',
        position: { lat: 34.0502124, lng: -118.3328166 }
    },
    {
        name: 'RESEDA RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/reseda',
        address: '18411 Victory Blvd., Reseda, CA 91335',
        position: { lat: 34.1872871, lng: -118.53351429999998 }
    },
    {
        name: 'ROSS SNYDER RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/ross-snyder',
        address: '1501 E. 41st St., Los Angeles, CA 90011',
        position: { lat: 34.0089705, lng: -118.2476661 }
    },
    {
        name: 'RUNNYMEDE PARK',
        url: 'https://www.laparks.org/park/runnymede',
        address: '20200 Runnymede, Winnetka, CA 91306',
        position: { lat: 34.2058852, lng: -118.57327929999997 }
    },
    {
        name: 'RUSTIC CANYON RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/rustic-canyon',
        address: '601 Latimer Rd., Pacific Palisades, CA 90402',
        position: { lat: 34.0379295, lng: -118.51461599999999 }
    },
    {
        name: 'ST. ANDREWS RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/saint-andrews',
        address: '8701 St. Andrews, Los Angeles, CA 90047',
        position: { lat: 33.9590948, lng: -118.31148439999998 }
    },
    {
        name: 'SEPULVEDA RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/sepulveda',
        address: '8801 Kester Ave., Panorama City, CA 91405',
        position: { lat: 34.2291889, lng: -118.45798930000001 }
    },
    {
        name: 'SHATTO RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/shatto',
        address: '3191 W. 4th St., Los Angeles, CA 90020',
        position: { lat: 34.0675043, lng: -118.28925129999999 }
    },
    {
        name: 'STONER RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/stoner',
        address: '1835 Stoner Ave., Los Angeles, CA 90025',
        position: { lat: 34.0384978, lng: -118.45356800000002 }
    },
    {
        name: 'STUDIO CITY RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/studio-city',
        address: '12621 Rye St., Studio City, CA 91604',
        position: { lat: 34.15142489999999, lng: -118.40769080000001 }
    },
    {
        name: 'SUN VALLEY RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/sun-valley',
        address: '8133 Vineland Ave., Sun Valley, CA 91352',
        position: { lat: 34.2181391, lng: -118.37144160000003 }
    },
    {
        name: 'SUNLAND RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/sunland',
        address: '8651 Foothill Blvd., Sunland, CA 91040',
        position: { lat: 34.260867, lng: -118.32196220000003 }
    },
    {
        name: 'SYCAMORE GROVE PARK',
        url: 'https://www.laparks.org/park/sycamore-grove',
        address: '4702 N. Figueroa St., Los Angeles, CA 90042',
        position: { lat: 34.1000935, lng: -118.2033179 }
    },
    {
        name: 'VALLEY PLAZA RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/valley-plaza',
        address: '12240 Archwood St., North Hollywood, CA 91605',
        position: { lat: 34.1919226, lng: -118.40054140000001 }
    },
    {
        name: 'VAN NESS RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/van-ness',
        address: '5720 2nd Ave., Los Angeles, CA 90043',
        position: { lat: 33.9906422, lng: -118.31872959999998 }
    },
    {
        name: 'VAN NUYS RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/van-nuys',
        address: '14301 Vanowen St., Van Nuys, CA 91605',
        position: { lat: 34.1942651, lng: -118.4451057 }
    },
    {
        name: 'VICTORY-VINELAND RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/victory-vineland',
        address: '11112 Victory Blvd., North Hollywood, CA 91606',
        position: { lat: 34.1866959, lng: -118.37273219999997 }
    },
    {
        name: 'WOODLAND HILLS RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/woodland-hills',
        address: '5858 Shoup Ave., Woodland Hills, CA 91367',
        position: { lat: 34.177124, lng: -118.61339800000002 }
    },
    {
        name: 'YOSEMITE RECREATION CENTER',
        url: 'https://www.laparks.org/reccenter/yosemite',
        address: '1840 Yosemite Dr., Los Angeles, CA 90041',
        position: { lat: 34.1334034, lng: -118.20733960000001 }
    }
];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: laPosition
    });
    currentLocationMarker = new google.maps.Marker({
        map: map,
        position: laPosition,
        icon: 'bluedot.png'
    });
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

function geocodeLocations() {
    var geocoder = new google.maps.Geocoder();
    locations.forEach(function(obj) {
        if (obj.position) {
        } else {
            geocoder.geocode({ address: obj.address }, function(results, status) {
                if (status === 'OK') {
                    obj.position = results[0].geometry.location;
                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
            sleep(2000);
        }
    });
}

function parseHTMLTable() {
    var rows = $('table').find('tr');
    rows.each(function(rowIndex, tr) {
        var a = $(tr.cells[0]).find('a')[0];
        var obj = {
            name: a.innerHTML,
            url: $(a).attr('href'),
            address: tr.cells[1].innerHTML
        };
        locations.push(obj);
    });
}

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

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > milliseconds) {
            break;
        }
    }
}

$(document).ready(function(e) {
    $('#map').css('height', window.innerHeight - 100);
    //parseHTMLTable();
    initMap();
    drawMarkers();
    //geocodeLocations();
});
