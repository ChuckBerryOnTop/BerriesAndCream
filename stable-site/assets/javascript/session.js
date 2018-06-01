//Helper function to figure out what sub folder path we are on
function getCurentFileName() {
    var pagePathName = window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}

//This is  great practise
//This function is meant to serve as a checker to make sure a login user is on the correct place
function IsLoggedIn() {
    var currentPath = getCurentFileName();
    var loginStatus = localStorage.getItem("user-logged");
    //If not logged in
    if (loginStatus == "false" || loginStatus == null)
        switch (currentPath) {
            case "login.html":
                {
                    //Do nothing cus we are already here
                }
                break;
            //Kick every one out to the front page
            case "index.html":
            case "addUser.html":
            case "lockerContents.html":
            case "":
                {
                    goToFrontPage();
                }
                break;
        }

    //If Logged in 
    else if (loginStatus == "true") {
        switch (currentPath) {
            case "login.html":
                {
                    goToUnlockPage();
                }
            case "lockerContents.html":
                {
                    if (localStorage.getItem("user") == null) {
                        goToUnlockPage();
                    }
                }
                break;


        }
    }
    else{
        goToFrontPage();
    }
}
