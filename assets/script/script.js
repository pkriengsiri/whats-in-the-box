$(document).ready(function () {
  // DOM VARIABLES

  // JS VARIABLES
  var userBoxes = JSON.parse(localStorage.getItem("boxes")) || []; // Tracks all the boxes the user has packed
  var storedUserName = localStorage.getItem("user-name") || ""; //Tracks the user name if the user has previously created a box

  // FUNCTION DECLARATIONS
  // Populates the name field in the form with the stored user name;
  function init() {
    if (storedUserName !== "") {
      $("#user-name").val(storedUserName);
    }
  }

  // Handles the behavior once the user clicks the submit button
  function generateQRCode() {
    // Pulls text fields from form and stores them as variables
    var userName = $("#user-name").val();
    var boxName = $("#box-name").val();
    var boxContent = $("#box-content").val();
    //If fields are empty the new error modal will show
    if (userName === "" || boxName === "" || boxContent === "") {
      $("#myModal1").modal("show");
    } else {
      // Converts the boxContent String to an array with the string split by line breaks
      var boxContentArray = boxContent.split("\n");
      var boxContentArrayString = JSON.stringify(boxContentArray);

     

      // Stores the user name in local storage
      localStorage.setItem("user-name", userName);

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
              contents: boxContentArrayString,
            },
          ],
        },

        success: function (response) {
          // Get the paste ID from the submitted paste
          var pasteID = response.id;
          // Adds the box name and paste ID as an object to the array of boxes packed
          var box = { name: boxName, pasteID: pasteID };
          userBoxes.push(box);
          // Adds the array of user boxes back to local storage
          localStorage.setItem("boxes", JSON.stringify(userBoxes));

          // Uses the html2pdf API to generate a pdf label of the QR code
          var htmlLink =
            "https://pkriengsiri.github.io/whats-in-the-box/Print/index.html?" +
            pasteID;
          $("#print-link").attr(
            "href",
            "https://api.html2pdf.app/v1/generate?apiKey=flx8MMkbCefJ2A3NYSTRE53Wi0ZlvXtFem7hEKSTtFEOrb0PPiaQKXRuKqGThL8m&format=Letter&filename=QRLabel&url=" +
              htmlLink
          );

          // Generates the QR Code to display on the screen
          var myUrl = new URL(
            "https://pkriengsiri.github.io/whats-in-the-box/scan"
          );
          myUrl.searchParams.set("name", pasteID);
          var newUrl = myUrl.href;
          $("#modal-body").empty();
          new QRCode("modal-body", {
            text: newUrl,
            width: 400,
            height: 400,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
          });
          $("#myModal").modal("show");
        },
      });
    }
  }

  // FUNCTION CALLS
  init();

  // EVENT HANDLERS
  //event listener to save input text into variables
  $("#print-label").on("click", function (e) {
    // Prevents default form behavior
    e.preventDefault();
    //reveals the Modal with QR code
    // checkInputs()

    generateQRCode();
  });

  $("#close-button").on("click", function () {
    location.reload();
  });

  //close button for error modal
  $("#close-button1").on("click", function () {
    $("#myModal1").modal("hide");
  });
});
