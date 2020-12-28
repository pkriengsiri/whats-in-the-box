$(document).ready(function() {

    var link = window.location.href.split("?");
    var pasteID = link[1];

    var myUrl = new URL(
        "https://pkriengsiri.github.io/whats-in-the-box/scan"
      );
      myUrl.searchParams.set("name", pasteID);
      var newUrl = myUrl.href;
      console.log(newUrl);
      $("#qr-appear-here").empty();
      new QRCode("qr-code", {
        text: newUrl,
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
      
      var queryURL = "https://api.paste.ee/v1/pastes/" + pasteID + "/?key=aNXCh2y6HrufDC2QMvqoKW7in1uvG7AhUOP1Z4JGF"
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {

          var boxName = response.paste.sections[0].name;
          $("#box-name").text(boxName);
        });

})