//Sets up all the Global Variables and Init
var long = "";
var lat = "";
var userKey = ""; 
var comboArray = [0, 0, 0];

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

var refs;
var resultArray;
refs = database;
var runOnce = false;
var sendData = false;
