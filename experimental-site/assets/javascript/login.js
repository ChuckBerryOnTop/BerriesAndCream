
// have to initialize first for modals to work
$('.modal').modal();

// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.float1');
//     var instances = M.FloatingActionButton.init(elems, {
//         direction: 'left'
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'left'
    });
});
//Notify the browser
//notifyCurrentBrowser()

//This is use to submit a user name and password
$("#button-submit").click(function () {
    var txtEmail = $("#email_inline").val();
    var txtPassword = $("#password").val();

    //Simple validation
    if (txtEmail.length >= 0) {
        if (/(.+)@(.+){2,}\.(.+){2,}/.test(txtEmail)) {
            // valid email so do nothing it can continue
        } else {
            // invalid email
            return displayModal("Invalid Email")
        }

    }

    if (txtPassword.length < 6) {
        return displayModal("Invalid Password Length")
    }

    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(txtEmail, txtPassword);

    //On fail it will display the fail error
    promise.catch(function (error) { displayModal(error.message) });
});

//On a the button click to signup
$("#button-signup").click(function () {

    var txtEmail = $("#email_inline").val();
    var txtPassword = $("#password").val();

    if (txtEmail.length == 0 || txtPassword < 6) {
        //Some UI info for the user
        displayModal("Make Sure to Fill in the information highlighted");
        $("#passwordRow").delay("4000").css('background-color', '#ee6e73').fadeIn();
        $("#emailRow").delay("4000").css('background-color', '#ee6e73').fadeIn();
        $(".input-field>label").css('color', 'white');
        return;
    }
    const auth = firebase.auth();
    console.log(txtEmail, txtPassword);
    const promise = auth.createUserWithEmailAndPassword(txtEmail, txtPassword);
    promise.catch(function (error) { displayModal(error.message) });
    promise.then(function(firebaseUser) {
        //I don't know if the next statement is necessary 
        firebase.auth().signOut();
        firebase.sharedInstance().signOut();
    });

});

//Multi Purpose message Loader
function displayModal(message) {
    $('#modal-message').html(message);
    $('#modal1').modal('open');
}

//Log-out button can log us out
$("#logout-now").click(function () {   
    localStorage.setItem("user-logged", false);
    localStorage.clear();
    firebase.auth().signOut();
    firebase.sharedInstance().signOut();
});

//This is for the google Auth
$("#signin-google").click(function () {
    //For Google Auth
    var provider = new firebase.auth.GoogleAuthProvider();

    //Fire base event to trigger google popup
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
});


//Firebase event handler that asynch updates our session based on the login status both internal and google auth
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log("User is Logged in");
        $("#dynamicMenu").removeClass("hide");
        //$(".float2").removeClass("hide");
       // $(".fixed-action-btn").removeClass("hide");
        localStorage.setItem("user-logged", true);
    }
    else {
        console.log("User is Not-Logged in");
        localStorage.setItem("user-logged", false);
    }
    IsLoggedIn();

});


// //dragbox
// dragElement(document.getElementById(("dragbox")));

// function dragElement(elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//   if (document.getElementById(elmnt.id + "header")) {
//     /* if present, the header is where you move the DIV from:*/
//     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//   } else {
//     /* otherwise, move the DIV from anywhere inside the DIV:*/
//     elmnt.onmousedown = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     e = e || window.event;
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//   }

//   function closeDragElement() {
//     /* stop moving when mouse button is released:*/
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }
