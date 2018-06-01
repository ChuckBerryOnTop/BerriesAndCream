var config = {
    apiKey: "AIzaSyAYPllRP9OnxxOD3jrzu3YdjGJcrrLiCA4",
    authDomain: "my-awesome-project-bac86.firebaseapp.com",
    databaseURL: "https://my-awesome-project-bac86.firebaseio.com",
    projectId: "my-awesome-project-bac86",
    storageBucket: "my-awesome-project-bac86.appspot.com",
    messagingSenderId: "392169717348"
  };
  firebase.initializeApp(config);

$(document).ready(function() {
    $('select').material_select();
});
  
const dbRef = firebase.database().ref();
const ytRef = dbRef.child('YT');
const ctRef = dbRef.child('ct');
 
 // load Youtube API code asynchronously
 var tag = document.createElement('script')
  
 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0]
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

 var player;

/*function onYouTubeIframeAPIReady() {
    player = new YT.Player('vid', {
        width: 600,
        height: 400,
        videoId: 'Xa0Q0J5tOP0',
        playerVars: {
            color: 'white',
            playlist: 'taJ60kskkns,FG0fTKAqZ5g'
        },
        events: {
            onReady: initialize
        }
    });

   

}*/
$(function() {
    player = new YT.Player('vid', {
        width: 600,
        height: 400,
        videoId: 'Xa0Q0J5tOP0',
        playerVars: {
            color: 'white',
            playlist: 'taJ60kskkns,FG0fTKAqZ5g'
        },
        events: {
            onReady: initialize
        }
    });
});

function initialize(){

    player.updateTimerDisplay();
    player.updateProgressBar();

    player.clearInterval(time_update_interval);

    time_update_interval = setInterval(function () {
        player.updateTimerDisplay();
        player.updateProgressBar();
    }, 1000)

}

/*var total = {
    arr : [],
};*/ 
var total = {
    arr: [],
    count : 0,
};

//var count = 0;
//var temp = [];
   
  ytRef.once("value", function(snap) {
        snap.forEach(function(childSnap){
            var childData = childSnap.val()
            console.log(childData); 
           
         console.log(childData.count);
        
       receive(childData.count, childData.id, childData.name);
       retrieveButtons(childData.count, childData.id, childData.name);
        })
      // temp  = snap.val();
        console.log(snap.val())
        
         console.log(name)
        // var val = snap.val()
         //var obj = Obj.keys(val);
        // var key = obj[0];
         //console.log('key'+key)
         //console.log(val.count)
         console.log(snap.key);
         //console.log(snap.count)
   });

ctRef.once("value", function(snap){
    count = snap.val();
});

function receive(count, id, name) {
    $('.test').append("c: "+count+ ' i'+id+ ' n'+name)

}  

function retrieveButtons(count, id, name) {

  
    //total.push(temp)
    console.log(total);
    //total.arr.slice();
   
    
  
    var buttonS = $('<button class="link" onclick="playNextVideo(this);">'+name+'</button>');
    buttonS.val(id);
    buttonS.addClass('link');
    buttonS.addClass('links');
    buttonS.addClass('card-panel');
    buttonS.addClass("waves-effect waves-light btn");
    buttonS.attr('countId', count);
  
    var buttonX = $('<button class="btn-floating btn-large waves-effect waves-light yellow" onclick="deleteItem(this);">');
    buttonX.text('x').addClass('close');
    buttonX.attr('countId', count);
    buttonS.append(buttonX); 
    storeButtons(count, id, name);
    $('#count').text(count);   
     
    $("#links").find('tbody')
        .append($('<tr>')
            .append($('<td>')
                
                .append($('<img src="http://img.youtube.com/vi/'+id+'/2.jpg">'))
                .append($(buttonS)
                    
                    
                )
                .append(buttonX)
            )
        ); 
       
     makeArr(this, count);
//}

}
//retrieveButtons();
function getButtons() {    
    
    var id = $('#input-id').val();
    var name = $('#input-name').val();
    //console.log(id);
    count++; 
    var auto = $('#auto').val();
    if (auto == 'On') {
        player.cueVideoById(id) 
        player.playVideo();
    }    
    //storeButtons(count, id, name);
    retrieveButtons(count, id, name)
    ytRef.push({count, id, name})

  /*  var buttonS = $('<button class="link" onclick="playNextVideo(this);">'+nextN+'</button>');
    buttonS.val(next);
    buttonS.addClass('link');
    buttonS.addClass('links');
    buttonS.addClass('card-panel');
    buttonS.addClass("waves-effect waves-light btn");
    buttonS.attr('countId', count);
  
    var buttonX = $('<button class="btn-floating btn-large waves-effect waves-light yellow" onclick="deleteItem(this);">');
    buttonX.text('x').addClass('close');
    buttonX.attr('countId', count);
    buttonS.append(buttonX); 
    storeButtons(count, next, nextN);
    $('#count').text(count);   
      
    $("#links").find('tbody')
    .append($('<tr>')
        .append($('<td>')
            
            .append($('<img src="http://img.youtube.com/vi/'+next+'/1.jpg">'))
            .append($(buttonS)
                
                
            )
            .append(buttonX)
        )
    ); */
       
    makeArr(this, count);

    ctRef.set(count)
}

function playNextVideo(element) {

    console.log('hey');
   
    var myVid = element.value;
  
    console.log(myVid);
    player.cueVideoById(myVid);
 
    player.playVideo();    

}



function deleteItem(element, count) {

    ;
    $(element).parent().remove();
  
    var cnt = $(element).attr('countId');
    console.log('Count = '+cnt);
  
   
    var index;
    for (i = 0; i < total.arr.length; i++) {
        if (total.arr[i].count == cnt) {
            index = i;
        }

    }

  //  var index = temp.indexOf(parseInt(cnt));
    
  
    total.arr.splice(index, 1);
  //  temp.splice(index, 1);
    
    ytRef.once("value", function(snap) {
        snap.forEach(function(childSnap){
            var childData = childSnap.val()
            console.log(childData); 
          
         console.log(childData.count);
        
            if (childData.count == cnt) {
                ytRef.child(childSnap.key).remove();
            }
        })
    
        console.log(snap.val())
      
         console.log(name)
     
         console.log(snap.key);
        
   });

    console.log(total);    
    $('#count').text(count);
    console.log('howdy');
    console.log('index2: '+index2);
  //  console.log('Index= '+index);
   // console.log('temp :'+temp);
   
    makeArr(this, count);
}

function storeButtons(count, id, name) {
  //  ytRef.once("value", function(snap) {
     //   total  = snap.val();
  
    total.arr.push({count, id, name});
    console.log(total);
    ytRef.once("child_added", function(snap) {
        var val = snap.val
        var thisId = val.id
        console.log(val)
        console.log(thisId)
        if (auto == 'On') {
            player.cueVideoById(thisId) 
            player.playVideo();
        }    


    })
   
    //temp.push(count);
   // console.log(temp);
    //ytRef.push({total : total.arr})
   
   // });  
     //ytRef.push({total : count, id, name})
    //ytRef.push({count, id, name})

      
}



function makeArr(element, count) {

    var arrDis = $('<p class="arrp">'+JSON.stringify(total)+'</p>');
 
    $('.arr').html(arrDis);
  
}


dragElement(document.getElementById(("dragbox")));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
/*function hover(element) {

   if ((element).val() == $('p').val((element).value)) {

        $('p').val(element.value).css("background-color", "yellow")  
   }
}*/
