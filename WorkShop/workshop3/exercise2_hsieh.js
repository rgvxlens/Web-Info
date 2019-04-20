// Link: https://www.w3schools.com/js/js_validation.asp
function getFormValue() {
    var x = document.getElementById("formname").elements;
    var obj = {};
    for (var i=0; i<x.length; i++) {
        var item = x.item(i);
        obj[item.name] = item.value;
    }

    alert("Firstname: " + obj["firstname"] + "; Lastname: " + obj["lastname"]);
}


