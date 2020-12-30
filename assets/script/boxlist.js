$(document).ready(function() {

function renderButtons() {

  var userBoxes = JSON.parse(localStorage.getItem("boxes"));
  for (var i = 0; i < userBoxes.length; i++) 
  {
    var paste = userBoxes[i].pasteID
    var listOfBoxes = $("<a>");
    listOfBoxes.addClass("btn list-group-item list-button col-3");
    listOfBoxes.text(userBoxes[i].name);
    listOfBoxes.attr("data-paste", userBoxes[i].pasteID);
    listOfBoxes.attr("href","https://pkriengsiri.github.io/whats-in-the-box/scan/?name="+paste)
    listOfBoxes.css("text-align", "left");
    $("#list-boxes").prepend(listOfBoxes);
  }
}



renderButtons();

});