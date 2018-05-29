//Helper function
function getCurentFileName(){
    var pagePathName= window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}

function IsLoggedIn(){
    var currentPath =  getCurentFileName();
    if(localStorage.getItem("user-logged") == "false")
    switch(currentPath)
    {  
        case "login.html":
        {
            //Do nothing cus we are already here
        }
        break;

        case "index.html":
        case "addUser.html":
        case "lockerContents.html":
        {
            goToFrontPage();
        }
        break;
    }

    if(localStorage.getItem("user-logged") == "true")
    switch(currentPath)
    {
        case "login.html":
        {
            goToUnlockPage();
        }
        break;

   
    }


}
