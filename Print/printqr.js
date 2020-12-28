$(document).ready(function() {

    var link = window.location.href.split("?");
    var pasteID = link[1];

    var myUrl = new URL(
        "https://pkriengsiri.github.io/whats-in-the-box/-scan"
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

})