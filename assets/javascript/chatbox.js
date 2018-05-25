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

// function loadCommentBox (){
//     var mainDiv = $(".main-area");
//     var form =$("<form>");
//     var commentBox = $("<div>");
//     commentBox.addClass("row main-screen");
//     var input = $("<div>")
//     input.addClass("form-group row");
//     input.append(`<input class="form-control" id="text-input" type="text" placeholder="Type here...">`);
//     input.append(`<button class="btn-floating btn-large waves-effect waves-light" id="submission" type="submit">Submit</button>`);
//     input.append(`<button class="btn-floating btn-large waves-effect waves-light" id="reset" >Reset</button>`);
//     form.append(commentBox);
//     form.append(input);
//     mainDiv.append(form);
// }
 