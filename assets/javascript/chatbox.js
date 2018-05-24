// var config2 = {
//     apiKey: "AIzaSyCwYeFUirtuvo1lFjm2ATD3zxlWI1pmHBo",
//     authDomain: "jeff-project-26325.firebaseapp.com",
//     databaseURL: "https://jeff-project-26325.firebaseio.com",
//     projectId: "jeff-project-26325",
//     storageBucket: "jeff-project-26325.appspot.com",
//     messagingSenderId: "574387886586"
// };
// firebase.initializeApp(config2);

// var database = firebase.database();

doMap();

$("#submission").on("click", function (event) {
    event.preventDefault();
    var textData = $("#text-input").val().trim();
    $("#text-input").val("");

    database.ref("/" + userKey + "-user").push({
        liveText: textData,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on('child_added', function (snapshot) {
    console.log(snapshot.val());
    var message = snapshot.val();
    $(".main-screen").append(`<div class="row">${message.liveText}</div>`);
 
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

$("#reset").on("click", function (event) {
    database.ref().remove();
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