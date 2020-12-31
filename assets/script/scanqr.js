$(document).ready(function () {
  //DOM VARIABLES

  //JS VARIABLES
  var userName = "";
  var boxName = "";
  var URL = window.location.href;
  var pasteID = "";

  //FUNCTION DECLARATIONS
  //Gets the paste ID from the URL
  function getPasteID() {
    var urlArray = URL.split("=");
    pasteID = urlArray[1];
  };

  //Pulls the box info from the paste and sets the content on the DOM
  function getBoxInfo() {
    var queryURL =
      "https://api.paste.ee/v1/pastes/" +
      pasteID +
      "/?key=aNXCh2y6HrufDC2QMvqoKW7in1uvG7AhUOP1Z4JGF";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // Get username and box name from paste API JSON
      boxName = response.paste.description;
      userName = response.paste.sections[0].name;
      // Get box contents and parse stringified array
      boxContentsArray = JSON.parse(response.paste.sections[0].contents);

      // Print each element of an array in the box-contents div
      for (var i = 0; i < boxContentsArray.length; i++) {
        var pEl = $("<p>");
        pEl.text(boxContentsArray[i]);
        $("#box-contents").append(pEl);
        pEl.addClass("mb-0");
      }

      // Set contents for user name and box name divs
      $("#user-name").text(userName);
      $("#box-name").text(boxName);
    });
  };

  // Displays the list of charities within 10 miles of the user's zip
  function displayCharitiesByZip() {
    // Get the user zip code from the form
    zipCode = $("#zip-form-input").val();

    //Check to see if it's a number or 5 digits
    if (zipCode.length < 5 || isNaN(zipCode)) {
      // Display error message
      $("#zip-error").removeClass("d-none");
    } else {
      // Hide any error messages
      $("#zip-error").addClass("d-none");
      $("#geo-unsupported").addClass("d-none");
      $("#geo-error").addClass("d-none");

      // API call to org hunter api to get charities by zip
      $.ajax({
        url:
          "https://cors-anywhere.herokuapp.com/http://data.orghunter.com/v1/charitysearch?user_key=219c0c9b2d181b353f5f69036fb5e105&eligible=1&distance=10&zipCode=" +
          zipCode,
        method: "GET",
      }).then(function (response) {
        // Clear the list
        $("#charity-list").empty();

        // Display first 10 charities from the API call
        printCharities(response);
      });
    };
  };

  // Displays the list of charities within 10 miles of the user's zip
  function displayCharitiesByGeo() {
    var latitude = "";
    var longitude = "";

    // Check to see if geolocation is supported
    if (!navigator.geolocation) {
      //Remove prior errors
      $("#zip-error").addClass("d-none");
      $("#geo-error").addClass("d-none");

      // Display error
      $("#geo-unsupported").removeClass("d-none");
    } else {
      // Get coordinates
      navigator.geolocation.getCurrentPosition(
        function (position) {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;

          // API call to org hunter api to get charities by zip
          $.ajax({
            url:
              "https://cors-anywhere.herokuapp.com/http://data.orghunter.com/v1/charitysearch?user_key=219c0c9b2d181b353f5f69036fb5e105&eligible=1&distance=10&latitude=" +
              latitude +
              "&longitude=" +
              longitude,
            method: "GET",
          }).then(function (response) {
            // Clear the list
            $("#charity-list").empty();

            // Display first 10 charities from the API call
            printCharities(response);
          });
        },
        function () {
          //Remove prior errors
          $("#geo-unsupported").addClass("d-none");
          $("#zip-error").addClass("d-none");
          //Display retrieval error
          $("#geo-error").removeClass("d-none");
        }
      );
    };
  };

  // Prints the list of charities to the modal element on the DOM
  function printCharities(response) {
    for (var i = 0; i < 10; i++) {
      charityLiEl = $("<li>");
      charityLiEl.addClass("list-group-item");
      charityNameEl = $("<h5>");
      charityNameEl.text(response.data[i].charityName);
      charityLiEl.append(charityNameEl);
      charityURLEl = $("<a>");
      charityURLEl.text("Website");
      charityURLEl.attr("href", response.data[i].url);
      charityURLEl.attr("target", "_blank");
      charityLiEl.append(charityURLEl);
      brEl = $("<br>");
      charityLiEl.append(brEl);
      charityMapsEl = $("<a>");
      charityMapsEl.text("Google Maps");
      charityMapsEl.attr(
        "href",
        "https://www.google.com/maps/search/?api=1&query=" +
          response.data[i].latitude +
          "," +
          response.data[i].longitude
      );
      charityMapsEl.attr("target", "_blank");
      charityLiEl.append(charityMapsEl);
      $("#charity-list").append(charityLiEl);
    };
  };

  //FUNCTION CALLS
  getPasteID();
  getBoxInfo();

  //EVENT HANDLERS
  $("#charity-button").on("click", function () {
    $("#charityModal").modal("show");
  });

  $("#close-button").on("click", function () {
    $("#charityModal").modal("hide");
  });

  $("#modal-form").on("submit", function (e) {
    e.preventDefault();
  });

  $("#zip-search").on("click", displayCharitiesByZip);

  $("#geo-search").on("click", displayCharitiesByGeo);
});
