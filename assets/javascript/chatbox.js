var config2 = {
    apiKey: "AIzaSyCwYeFUirtuvo1lFjm2ATD3zxlWI1pmHBo",
    authDomain: "jeff-project-26325.firebaseapp.com",
    databaseURL: "https://jeff-project-26325.firebaseio.com",
    projectId: "jeff-project-26325",
    storageBucket: "jeff-project-26325.appspot.com",
    messagingSenderId: "574387886586"
};
var secondary = firebase.initializeApp(config2, "secondary");

var seconddatabase = secondary.database();

//Display the map
doMap();

//Display yahoo
showWeather();

//Events
$("#submission").on("click", function (event) {
    event.preventDefault();
    var textData = $("#text-input").val().trim();
    $("#text-input").val("");

    seconddatabase.ref("/"+userKey+"-user").push({
        liveText: textData,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

seconddatabase.ref("/"+userKey+"-user").on('child_added', function (snapshot) {
    console.log(snapshot.val());
    var message = snapshot.val();


    $(".main-screen").append(`<div class="row">${message.liveText}</div>`);
 
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

seconddatabase.ref("/"+userKey+"-user").on('child_removed', function (snapshot) {
    document.location.reload();
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

$("#reset").on("click", function (event) {
    seconddatabase.ref("/"+userKey+"-user").remove();
});
