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

  
      var card = $("<div>").addClass("card card-custom mx-2 mb-3 align-items-center");
      var cardTitle = $("<h3>");
      var boxContents = $("<a>").addClass("fas fa-box fa-6x mt-1");

      cardTitle.text(userBoxes[i].name);
      boxContents.attr(
        "href",
        "https://pkriengsiri.github.io/whats-in-the-box/scan/?name=" + paste
      );
    
      
      

      var reprintQRButton = $("<a>");
      reprintQRButton.addClass("btn");
      reprintQRButton.text("Reprint QR Code");
      reprintQRButton.attr(
        "href",
        "https://api.html2pdf.app/v1/generate?apiKey=flx8MMkbCefJ2A3NYSTRE53Wi0ZlvXtFem7hEKSTtFEOrb0PPiaQKXRuKqGThL8m&format=Letter&filename=QRLabel&url=" +
          htmlLink
      );
      reprintQRButton.attr("target","_blank");

      card.append(cardTitle);
      card.append(boxContents);
      card.append(reprintQRButton);

      $("#box-row").append(card);
      
       
    }
  }

  // FUNCTION CALLS
  renderButtons();
});
