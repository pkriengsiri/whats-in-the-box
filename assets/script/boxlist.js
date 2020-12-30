$(document).ready(function() {

function renderButtons() {

  var userBoxes = JSON.parse(localStorage.getItem("boxes"));
  for (var i = 0; i < userBoxes.length; i++) {
    var listOfBoxes = $("<button>");
    listOfBoxes.addClass("list-group-item list-button col-3");
    listOfBoxes.text(userBoxes[i].name);
    listOfBoxes.attr("data-paste", userBoxes[i].pasteID);
    listOfBoxes.css("text-align", "left");
    $("#list-boxes").prepend(listOfBoxes);
    console.log(userBoxes[i].name);
    var paste = userBoxes[i].pasteID
    console.log(paste);
  }
}



renderButtons();

 $(document).on("click", ".list-button", function (e) {
   var pasteID = $(this).attr("data-paste");
   console.log($(this).attr("data-paste"));
   getBoxInfo(pasteID);

  function getBoxInfo(pasteID) {
    var queryURL = "https://api.paste.ee/v1/pastes/" + pasteID + "/?key=aNXCh2y6HrufDC2QMvqoKW7in1uvG7AhUOP1Z4JGF"
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {

          // boxName = response.paste.description;
          userName = response.paste.sections[0].name;
          boxContents = response.paste.sections[0].contents;

          $("#user-name").text(userName);
          // $("#box-name").text(boxName);
          $("#box-contents").text(boxContents);
        });
}

    
    });

});