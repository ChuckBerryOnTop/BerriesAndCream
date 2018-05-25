

console.log("Test");


function addToDb(UserKeyArr)
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
    );
}

$("form").submit(function () {
    event.preventDefault();
    var index0 = $("#1").val();
    var index1 = $("#2").val();
    var index2 = $("#3").val();

    console.log(index0);
    console.log(index1);
    console.log(index2);

    var userKeyArr = [];

    userKeyArr.push(index0);
    userKeyArr.push(index1);
    userKeyArr.push(index2);

    addToDb(userKeyArr);
});


