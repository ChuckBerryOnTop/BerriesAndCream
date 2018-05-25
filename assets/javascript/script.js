// var YOUR_API_KEY ="AIzaSyAzZp4A3mUd0IiVr_KMP-fTP0MdKt6O8nQ";
var storageUser = JSON.parse(localStorage.getItem("user"));
// var appendText = $( '<script async defer \
//     src="https://maps.googleapis.com/maps/api/js?key='+
//     this.YOUR_API_KEY+
//     '&callback=initMap"> \
//     </script>')
// $("body").prepend(appendText);

// $("#google").attr("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyAzZp4A3mUd0IiVr_KMP-fTP0MdKt6O8nQ");
// $("#google").attr("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyAzZp4A3mUd0IiVr_KMP-fTP0MdKt6O8nQ");


function checkKeys() {
    refs.ref("/" + userKey + "-user").once("value", function (snapshot) {
        
        resultArray = snapshot.val();
        if (resultArray == null) {
            return false;
        }
        console.log("Result Array : " + resultArray);
        var child = snapshot.child;
        console.log(child);
        var tempPos = [];
        console.log(snapshot.val().userCord);
        tempPos.push(JSON.parse(snapshot.val().userCord));

        if (tempPos.length == 1) {
            (userKey == tempPos[0].user)
            {
                long = tempPos[0].lng;
                lat = tempPos[0].lat;
            }
            validKey = true;
            
        }
        if (tempPos.length <= 0) {
            validKey = false;
        }

        if (validKey == true) {
     
            this.pos = {
                lat: tempPos[0].lat,
                lng: tempPos[0].lng,
                user: tempPos[0].user
            }
           localStorage.setItem("user",JSON.stringify(pos));
           changeToLockerContent();
        }
        else {
            console.log("Not Valid Key"); 
                
            
        }

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function doMap() {
   try{
    if((typeof  storageUser.lng != "undefined")||(typeof  storageUser.lat != "undefined"))
    {
     long = storageUser.lng;
     lat = storageUser.lat;
     userKey =  storageUser.user;
    }
    else{
        long = "";
        lat = "";      
    }

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
                user: userKey
            }
            sendData = false;
            init(this.pos);
        }
        runOnce = true;
    }
    }
    catch{
       
            window.location.href = "index.html";
        
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
        var vari = pos.user + "-user";
        database.ref("/" + vari).set(
            {
                userCord: JSON.stringify(pos)
            }
        );
        localStorage.setItem("user",JSON.stringify(pos));
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




