$(document).ready(function () {
  // DOM VARIABLES

  // JS VARIABLES
  var userBoxes = []; // Tracks all the boxes the user has packed

  // FUNCTION DECLARATIONS

  // Handles the behavior once the user clicks the submit button

  function generateQRCode() {
    // Prevents default form behavior
    
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
        pasteID = response.id;
        console.log(pasteID);

        $("#qr-appear-here").empty();
        $("#qr-appear-here").qrcode
        ({ text: pasteID,
          size: 500,
          value: "Hello", 
        
        });

      },
    });
  }

  // FUNCTION CALLS
  // EVENT HANDLERS
  //event listener to save input text into variables
  $("#print-label").on("click", function (e) {
    e.preventDefault();
    generateQRCode();
  
  });
});
