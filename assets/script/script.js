console.log("hello World");



//event listener to save input text into variables
$("#print-label").on("click", function (e) {
e.preventDefault();
var userName = $("#user-name").val();
var boxName = $("#box-name").val();
var boxContent = $("#box-content").val();
var formContent = userName +" "+ boxName + " "+ boxContent
console.log(userName);
console.log(boxName);
console.log(boxContent);
console.log(formContent);

});