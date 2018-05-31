//Sets up all the Global Variables and Init
var long = "";
var lat = "";
var userKey = "";
var comboArray = [-1, -1, -1];

//first DB setit up
var config = {
    apiKey: "AIzaSyDI1LtXpqUCshBIBSmJLdzfp1UFNRT5bfY",
    authDomain: "chuckberrydropoff.firebaseapp.com",
    databaseURL: "https://chuckberrydropoff.firebaseio.com",
    projectId: "chuckberrydropoff",
    storageBucket: "",
    messagingSenderId: "510478001598"
};

firebase.initializeApp(config);
var database = firebase.database();

//Some Global Vars
var refs;
var resultArray;
refs = database; //Needs to run after setup
var runOnce = false;
var sendData = false;
var userKeyArr = [];
var KeyToCheck;

//navigates us to the page we want, some global functions
function changeToLockerContent() {
    window.location.href = "lockerContents.html";
}
function goToFrontPage() {
    window.location.href = "login.html";
}
function goToUnlockPage() {
    window.location.href = "index.html";
}
function goToAdminPage() {
    window.location.href = "addUser.html";
}


function notifyCurrentBrowser() {
    var browser_name = '';
    isIE = /*@cc_on!@*/false || !!document.documentMode;
    isEdge = !isIE && !!window.StyleMedia;
    if (navigator.userAgent.indexOf("Chrome") != -1 && !isEdge) {
        browser_name = 'chrome';
    }
    else if (navigator.userAgent.indexOf("Safari") != -1 && !isEdge) {
        browser_name = 'safari';
    }
    else if (navigator.userAgent.indexOf("Firefox") != -1) {
        browser_name = 'firefox';
    }
    else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
    {
        browser_name = 'ie';
    }
    else if (navigator.userAgent.indexOf("Mozilla") != -1 && !isEdge) {
        browser_name = 'chrome';
    }
    else if (isEdge) {
        browser_name = 'edge';
    }
    else {
        browser_name = 'other-browser';
    }

    if (browser_name != 'chrome' && browser_name != 'firefox') {
        displayModal("Debug [" + navigator.userAgent + "] Your browser " + browser_name + " is not Compatible Be Aware of Wierd side effects");
    }

}

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });




//Firebase event handler that asynch updates our session based on the login status both internal and google auth
firebase.auth().onAuthStateChanged(firebaseUser => {
    try {
        if (firebaseUser) {
            console.log("User is Logged in");
            $("#dynamicMenu").removeClass("hide");
            localStorage.setItem("user-logged", true);

        }
        else {
            console.log("User is Not-Logged in");
            localStorage.setItem("user-logged", false);
        }
        IsLoggedIn();
    } catch (error) {
        console.log(error);

    }
});
