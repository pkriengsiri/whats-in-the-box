$(document).ready(function() {
// FUNCTION DECLARATIONS

// Render the list of boxes to the DOM
function renderButtons() {
  // Pulls and parses the stringified array of boxes from localStorage
  var userBoxes = JSON.parse(localStorage.getItem("boxes"));

  //Prints the boxes to the DOM
  for (var i = 0; i < userBoxes.length; i++) 
  {
    var paste = userBoxes[i].pasteID

    var ulEl = $("<ul>");
    ulEl.addClass("list-group");
    var liEl = $("<li>");
    liEl.addClass("list-group-item");
    var boxDisplayButton = $("<a>");
    boxDisplayButton.addClass("btn");
    boxDisplayButton.text(userBoxes[i].name);
    //listOfBoxes.attr("data-paste", userBoxes[i].pasteID);
    boxDisplayButton.attr("href","https://pkriengsiri.github.io/whats-in-the-box/scan/?name="+paste);
    //listOfBoxes.css("text-align", "left");
    liEl.append(boxDisplayButton);
    ulEl.append(liEl);
    $("#list-boxes").append(ulEl);
  }
}


// FUNCTION CALLS
renderButtons();

});