$(document).ready(function() {

function renderButtons() {

  var userBoxes = JSON.parse(localStorage.getItem("boxes"));
  for (var i = 0; i < userBoxes.length; i++) {
    var listOfBoxes = $("<button>");
    listOfBoxes.addClass("list-group-item list-button col-3");
    listOfBoxes.text(userBoxes[i].name);
    listOfBoxes.css("text-align", "left");
    $("#list-boxes").prepend(listOfBoxes);
    console.log(userBoxes[i].name);
  }
}



renderButtons();

});