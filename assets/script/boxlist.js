$(document).ready(function () {
  // FUNCTION DECLARATIONS

  // Render the list of boxes to the DOM
  function renderButtons() {
    // Pulls and parses the stringified array of boxes from localStorage
    var userBoxes = JSON.parse(localStorage.getItem("boxes"));

    //Prints the boxes to the DOM
    for (var i = 0; i < userBoxes.length; i++) {
      var paste = userBoxes[i].pasteID;
      var htmlLink =
        "https://pkriengsiri.github.io/whats-in-the-box/Print/index.html?" +
        paste;

      // Creates a ul, creates a li, creates two buttons for each li, then appends all to the DOM
      var ulEl = $("<ul>");
      ulEl.addClass("list-group");
      var liEl = $("<li>");
      liEl.addClass("list-group-item");
      var boxDisplayButton = $("<a>");
      boxDisplayButton.addClass("btn");
      boxDisplayButton.text("Box Name: " + userBoxes[i].name);
      boxDisplayButton.attr(
        "href",
        "https://pkriengsiri.github.io/whats-in-the-box/scan/?name=" + paste
      );
      liEl.append(boxDisplayButton);
      var reprintQRButton = $("<a>");
      reprintQRButton.addClass("btn");
      reprintQRButton.text("Reprint QR Code");
      reprintQRButton.attr(
        "href",
        "https://api.html2pdf.app/v1/generate?apiKey=flx8MMkbCefJ2A3NYSTRE53Wi0ZlvXtFem7hEKSTtFEOrb0PPiaQKXRuKqGThL8m&format=Letter&filename=QRLabel&url=" +
          htmlLink
      );
      reprintQRButton.attr("target","_blank");
      liEl.append(reprintQRButton);
      ulEl.append(liEl);
      $("#list-boxes").append(ulEl);
    }
  }

  // FUNCTION CALLS
  renderButtons();
});
