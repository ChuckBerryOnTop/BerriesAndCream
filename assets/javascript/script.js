console.log(combination.jeff);

function checkKeys() {
    refs.ref("/" + userKey).once("value", function (snapshot) {
        resultArray = snapshot.val();
        console.log("Result Array : " + resultArray);
        var child = snapshot.child;
        console.log(child);
        var tempPos = [];
        snapshot.forEach(function (entry) {
            console.log(entry.val().userCord);
            tempPos.push(JSON.parse(entry.val().userCord));
        });
        if (tempPos.length > 0) {
            tempPos.forEach(function (entry) {
                if (userKey == entry.user) {
                    long = entry.lng;
                    lat = entry.lat;
                }
            });
           return true; 
        }
        if (tempPos.length <= 0) {
            return false;
        }s
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function doMap() {
    if (runOnce == false) {
        if (long == "") {
            if (navigator.geolocation) {
                var pos;
                navigator.geolocation.getCurrentPosition(function (position) {
                    this.pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        user: userKey
                    }
                    console.log(this.pos.lat);
                    long = this.pos.long;
                    lat = this.pos.lat;
                    sendData = true;
                    init(this.pos);

                }
                )
            };
        }
        else {
            var pos;
            this.pos = {
                lat: lat,
                lng: long,
            }
            sendData = false;
            init(this.pos);
        }
        runOnce = true;
    }
}

function init(pos) {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 20,

        // disable UI
        disableDefaultUI: true,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(pos.lat, pos.lng), // New York

        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap', 'terrain', 'satellite', 'hybrid']
        },
        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
    };

    if (sendData) {
        var vari = pos.user;
        database.ref("/" + vari).set(
            {
                userCord: JSON.stringify(pos)
            }
        );
    }
    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(pos.lat, pos.lng),
        map: map,
        title: 'Snazzy!'
    });
}