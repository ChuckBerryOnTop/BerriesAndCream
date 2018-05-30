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
var KeyToCheck ;

//navigates us to the page we want, some global functions
function changeToLockerContent()
{
    window.location.href = "lockerContents.html";
}   
function goToFrontPage()
{ 
    window.location.href = "login.html";
}
function goToUnlockPage()
{ 
    window.location.href = "index.html";
}   
function goToAdminPage()
{ 
    window.location.href = "addUser.html";
}