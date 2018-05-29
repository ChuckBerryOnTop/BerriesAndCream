function addToDb(UserKeyArr,doRefresh=false)
{
    var pos;
    this.pos = {
        lat: "",
        lng: "",
        user: UserKeyArr[0]+""+UserKeyArr[1]+""+UserKeyArr[2]
    }
    var vari = this.pos.user+"-user";
    database.ref("/" + vari).set(
        {
            userCord: JSON.stringify(this.pos)
        }
    ,function(error) {
        if (error) {
          // The write failed...
          displayModal("Error !!!")
          
        } else {
         
          console.log("Success");
          displayModal("Added Key "+ this.pos.user);
          if(doRefresh)
          {
            checkKeys() ;
            
          }
        }
      });
}

function validateAdminKey(userArr)
{
    refs.ref("/" + "addCode" + "User").once("value", function (snapshot) {
        var result= snapshot.val();
        if($("#adminKey").val() === result)
        {
            addToDb(userArr);
        }
        else{
            displayModal("Wrong Add Code Ma Dude!");
        }
       
    });
}

$("#addUser").submit(function () {
    event.preventDefault();
    var index0 = $("#1").val();
    var index1 = $("#2").val();
    var index2 = $("#3").val();

    KeyToCheck = $("#adminKey").val();
    console.log(index0);
    console.log(index1);
    console.log(index2);

    userKeyArr.push(index0);
    userKeyArr.push(index1);
    userKeyArr.push(index2);

    validateAdminKey(userKeyArr);
    
});


// On a reset
$("#mapClear").click(function(){ 

    var userKeyArr = [];  
    userKeyArr.push(storageUser.user[0]);
    userKeyArr.push(storageUser.user[1]);
    userKeyArr.push(storageUser.user[2]);
    addToDb(userKeyArr,true);
 
})