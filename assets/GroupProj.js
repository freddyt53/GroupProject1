//initialize firebase

var config = {
  apiKey: "AIzaSyDs6mtbeyU8Jdc-qGhCv_uI134vsUEuq9Y",
  authDomain: "project1-83534.firebaseapp.com",
  databaseURL: "https://project1-83534.firebaseio.com",
  projectId: "project1-83534",
  storageBucket: "project1-83534.appspot.com",
  messagingSenderId: "581131445272"
};
firebase.initializeApp(config);

var groupData = firebase.database();


//add citation button
$('#submitCitation').on("click", function (event) {
  event.preventDefault();

  //user input
  var citationNumber = $("#citationNumberInput").val().trim();
  var stateOfCitation = $("#stateOfCitation").val().trim();
  var licensePlate = $("#licenseInput").val().trim();

  console.log(citationNumber, stateOfCitation, licensePlate);

  //local var to hold the user information
  var newCitation = {
    citationNumber: citationNumber,
    stateOfCitation: stateOfCitation,
    licensePlate: licensePlate,
  }
  //pushes data to database
  groupData.ref().push(newCitation);

  // Clears all of the text-boxes
  $("#citationNumberInput").val("");
  $("#stateOfCitation").val("");
  $("#licenseInput").val("");

  //keeps from refreshing page
  return false;

});


//creates firebase event to add citations
groupData.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var data = childSnapshot.val();
  cNumber = data.citationNumber;
  stateCitation = data.stateOfCitation;
  lPlate = data.licensePlate;

  //console.logs
  // console.log(cNumber);
  // console.log(stateCitation);
  // console.log(lPlate);

  //calls on correct rows to display info
  var newRow = $("<tr>").append(
    $("<td>").text(cNumber),
    $("<td>").text(stateCitation),
    $("<td>").text(lPlate),
  );

  //appends text to destination to display
  $("#dataList > tbody").append(newRow);
});



//la city JSON info
var data = "";

//la city request
fetch('https://data.lacity.org/resource/8yfh-4gug.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    //console.log(JSON.stringify(myJson));
    data = myJson
  });

//button for JSON search
$('#submitCitation3').on("click", function (event) {
  var input = $("#searchInput").val().trim();
  var ticketDetails = $("#ticketInfo")
  event.preventDefault();
  $("#searchInput").val("");
  console.log(data);


  for (var i = 0; i < data.length; i++) {
    var matchFound = false;
    if (input === data[i].ticket_number) {
      matchFound == true;
      console.log(data[i]);
      var newRow = $("<tr>").append(
        $("<td>").text(data[i].ticket_number),
        $("<td>").text(data[i].location),
        $("<td>").text(data[i].make),
        $("<td>").text("$" + data[i].fine_amount),
        $("<td>").text(data[i].violation_description),
      );
      $('#ticketInfo').append(newRow);
    }
  }
});



//news API
//  var newsData = "";


// // //for the News page
//  var newsApiKey = "c9952e074181464ea384595ef02c08bd";

//  var url = 'https://newsapi.org/v2/everything?' +
//    'q=traffic+laws&' +
//    'from=2019-01-08&' +
//    'sortBy=popularity&' +
//    'apiKey=c9952e074181464ea384595ef02c08bd';

//  var req = new Request(url);

//  fetch(req)
//    .then(function (response) {
//      console.log(response.json());
     
//     })
//     .then(function (newsJson) {
//     //.then(function (newsJson) {
//      //console.log(JSON.stringify(myJson));
//      newsData = newsJson
//       console.log(hello);
//      //.then(function (response) {
//       newsData.forEach(function (element) {
//         console.log(newsJson)
//         newDiv = $("<div>");
//         newDiv.addClass("individual-news-container");
//         newDiv.append("<p>Rating: " + element.content + "</p>");
//         var newImage = $("<img src = '" + element.urlToImage + "'>");
//         newImage.addClass("news-image");
//         newImage.attr("state", "still");
//         newImage.attr("still-data", element.images.fixed_height_still.url);
//         newImage.attr("animated-data", element.images.fixed_height.url);
//         newDiv.append(newImage);
//         $("#newsInfo").append(newDiv);
//       });
//     });
//   // });

   





// // var coll = document.getElementsByClassName("collapsible");
// // var i;

// // for (i = 0; i < coll.length; i++) {
// //   coll[i].addEventListener("click", function () {
// //     this.classList.toggle("active");
// //     var content = this.nextElementSibling;
// //     if (content.style.maxHeight) {
// //       content.style.maxHeight = null;
// //     } else {
// //       content.style.maxHeight = content.scrollHeight + "px";
// //     }
// //   });
// // }