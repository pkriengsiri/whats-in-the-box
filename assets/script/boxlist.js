$(document).ready(function() {

function renderButtons() {
  for (var i = 0; i < userBoxes.length; i++) {
    var nameBox = userBoxes[i];
    var listOfBoxes = $("<button>");
    listOfBoxes.addClass("list-group-item list-button col-3");
    // listOfBoxes.attr("data-paste", nameBox.pasteID);
    listOfBoxes.text(nameBox.name);
    listOfBoxes.css("text-align", "left");
    $("#box-name").prepend(listOfBoxes);
    console.log(nameBox.name);
  }
}


}