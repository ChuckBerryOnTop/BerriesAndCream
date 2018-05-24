
    var select = $("#1-10-1");
    var select2 = $("#1-10-2");
    var select3 = $("#1-10-3");
    
    for (i=1;i<=10;i++){
        select.append($('<option></option>').val(i).html(i));
        select2.append($('<option></option>').val(i).html(i))
        select3.append($('<option></option>').val(i).html(i))
    }
 
