$(document).ready(function() {
//DOM VARIABLES

//JS VARIABLES
var userName = "";
var boxName = "";
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
          // Get username and box name from paste API JSON  
          boxName = response.paste.description;
          userName = response.paste.sections[0].name;
          // Get box contents and parse stringified array
          boxContentsArray = JSON.parse(response.paste.sections[0].contents);

          // Print each element of an array in the box-contents div
          for(var i=0; i < boxContentsArray.length; i++) {
              var pEl = $("<p>")
              pEl.text(boxContentsArray[i]);
              $("#box-contents").append(pEl);
              pEl.addClass("mb-0");
          }

          
          // Set contents for user name and box name divs
          $("#user-name").text(userName);
          $("#box-name").text(boxName);
        });
}

//FUNCTION CALLS
getPasteID();
getBoxInfo();

//EVENT HANDLERS


});