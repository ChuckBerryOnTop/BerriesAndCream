

var long ="";
var lat ="";

if (navigator.geolocation) {
    var pos;
    navigator.geolocation.getCurrentPosition(function(position) {
    this.pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,       
      }
      console.log(pos.lat);
      long = pos.long;
      lat = pos.lat;
      init(this.pos);
    }
    )
   
};




function init(pos) {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
    // How zoomed in you want the map to start at (always required)
    zoom: 11,

    // disable UI
    disableDefaultUI: true,
    
    // The latitude and longitude to center the map (always required)
    center: new google.maps.LatLng(pos.lat, pos.lng), // New York
    
    // How you would like to style the map. 
    // This is where you would paste any style found on Snazzy Maps.
    styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
};

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



//code for uploading the comment box
var config = {
    apiKey: "AIzaSyCwYeFUirtuvo1lFjm2ATD3zxlWI1pmHBo",
    authDomain: "jeff-project-26325.firebaseapp.com",
    databaseURL: "https://jeff-project-26325.firebaseio.com",
    projectId: "jeff-project-26325",
    storageBucket: "jeff-project-26325.appspot.com",
    messagingSenderId: "574387886586"
};
firebase.initializeApp(config);

var database = firebase.database();



$("#submission").on("click", function (event) {
    event.preventDefault();
    var textData = $("#text-input").val().trim();
    $("#text-input").val("");

    database.ref().push({
        liveText: textData,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on('child_added', function (snapshot) {
    console.log(snapshot.val());
    var message = snapshot.val();
    // $(".main-screen").append(`<div class="row">${message.liveText}</div>`);
    $(".main-screen").text(message.liveText);


}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

$("#reset").on("click", function (event) {
    database.ref().remove();
});

function loadCommentBox (){
    var mainDiv = $(".main-area");
    var form =$("<form>");
    var commentBox = $("<div>");
    commentBox.addClass("row main-screen");
    var input = $("<div>")
    input.addClass("form-group row");
    input.append(`<input class="form-control" id="text-input" type="text" placeholder="Type here...">`);
    input.append(`<button class="btn-floating btn-large waves-effect waves-light" id="submission" type="submit">Submit</button>`);
    input.append(`<button class="btn-floating btn-large waves-effect waves-light" id="reset" >Reset</button>`);
    form.append(commentBox);
    form.append(input);
    mainDiv.append(form);
}