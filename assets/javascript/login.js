
//TODO : Validate the email and password
$('.modal').modal(); // have to initialize first for modals to work
$("#button-submit").click(function () {

    var txtEmail = $("#email_inline").val();
    var txtPassword = $("#password").val();

    const auth = firebase.auth();
    console.log(txtEmail, txtPassword);
    const promise = auth.signInWithEmailAndPassword(txtEmail, txtPassword);
    promise.catch(e => displayModal(e.message));
});


$("#button-signup").click(function () {

    var txtEmail = $("#email_inline").val();
    var txtPassword = $("#password").val();

    const auth = firebase.auth();
    console.log(txtEmail, txtPassword);
    const promise = auth.createUserWithEmailAndPassword(txtEmail, txtPassword);
    promise.catch(e => displayModal(e.message));
});

function displayModal(message)
{
  $('#modal-message').html(message);  
  $('#modal1').modal('open'); 
}


$("#logout-now").click(function () {
    firebase.auth().signOut();
});

$("#signin-google").click(function () 
{
//For Google Auth
var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
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

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log("User is Logged in");
        $( "#login-state").removeClass("hide");
        localStorage.setItem("user-logged",true);
    }
    else {
        console.log("User is Not-Logged in");
        localStorage.setItem("user-logged",false);
 
    }   
    IsLoggedIn();

});

