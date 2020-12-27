$(document).ready(function () {
  // DOM VARIABLES

  // JS VARIABLES
  var userBoxes = []; // Tracks all the boxes the user has packed

  // FUNCTION DECLARATIONS
  // function makeQr (){

  // }

  // Handles the behavior once the user clicks the submit button

  function generateQRCode() {
    var myUrl = new URL("https://pkriengsiri.github.io/whats-in-the-box/");
    myUrl.searchParams.set("name", "pasteID");
    var newUrl = myUrl.href;
    console.log(newUrl);
    $("#qr-appear-here").empty();
    new QRCode("qr-appear-here", {
      text: newUrl,
      width: 100,
      height: 100,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });

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
        console.log(pasteID);
      },
    });
  }

  // FUNCTION CALLS
  // EVENT HANDLERS
  //event listener to save input text into variables
  $("#print-label").on("click", function (e) {
    // Prevents default form behavior
    e.preventDefault();
    generateQRCode();
  });
});
