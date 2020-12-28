$(document).ready(function () {
  // DOM VARIABLES

  // JS VARIABLES
  var userBoxes = []; // Tracks all the boxes the user has packed

  // Handles the behavior once the user clicks the submit button

  function generateQRCode() {

    // Pulls text fields from form and stores them as variables
    var userName = $("#user-name").val();
    var boxName = $("#box-name").val();
    var boxContent = $("#box-content").val();

    // Call the paste API to box the box contents to a new paste
    var queryURL =
      "https://api.paste.ee/v1/pastes?key=aNXCh2y6HrufDC2QMvqoKW7in1uvG7AhUOP1Z4JGF&encrypted=false";
    $.ajax({
      url: queryURL,
      type: "POST",
      data: {
        description: boxName,
        sections: [
          {
            name: userName,
            syntax: "autodetect",
            contents: boxContent,
          },
        ],
      },

      success: function (response) {
        // Get the paste ID from the submitted paste
        var pasteID = response.id;
        $("#print-link").attr("href", "./Print/index.html?" + pasteID);
        console.log(pasteID);
        var myUrl = new URL(
          "https://pkriengsiri.github.io/whats-in-the-box/-scan"
        );
        myUrl.searchParams.set("name", pasteID);
        var newUrl = myUrl.href;
        console.log(newUrl);
        $("#modal-body").empty();
        new QRCode("modal-body", {
          text: newUrl,
          width: 100,
          height: 100,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });
      },
    });
  }

  // FUNCTION CALLS
  // EVENT HANDLERS
  //event listener to save input text into variables
  $("#print-label").on("click", function (e) {
    // Prevents default form behavior
    $('#myModal').modal('show');
    e.preventDefault();
    generateQRCode();
    
  });


});
