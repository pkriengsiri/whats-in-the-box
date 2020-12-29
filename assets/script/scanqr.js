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

//Pulls the box info from the paste and sets the content on the DOM
function getBoxInfo() {
    var queryURL = "https://api.paste.ee/v1/pastes/" + pasteID + "/?key=aNXCh2y6HrufDC2QMvqoKW7in1uvG7AhUOP1Z4JGF"
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {

          boxName = response.paste.description;
          userName = response.paste.sections[0].name;
          boxContents = response.paste.sections[0].contents;

          $("#user-name").text(userName);
          $("#box-name").text(boxName);
          $("#box-contents").text(boxContents);
        });
}

//FUNCTION CALLS
getPasteID();
getBoxInfo();

//EVENT HANDLERS


});