$(document).ready(function() {
//DOM VARIABLES

//JS VARIABLES
var userName = "";
var boxName = "";
var boxContents = "";
var URL = window.location.href;
var pasteID = "";

//FUNCTION DECLARATIONS
//Gets the paste ID from the URL
function getPasteID() {
    var urlArray = URL.split("=");
    pasteID = urlArray[1];
    console.log(pasteID);
}

//FUNCTION CALLS
getPasteID();

//EVENT HANDLERS


});