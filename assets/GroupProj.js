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
  $("#contactName").val("");
  $("#contactEmail").val("");
  $("#contactPhone").val("");
  $("#contactMessage").val("");

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


// // Initialize Firebase for contact page
// var config = {
//   apiKey: "AIzaSyDs6mtbeyU8Jdc-qGhCv_uI134vsUEuq9Y",
//   authDomain: "project1-contactus.firebaseapp.com",
//   databaseURL: "https://project1-contactus.firebaseio.com",
//   projectId: "project1-contactus",
//   storageBucket: "project1-contactus.appspot.com",
//   messagingSenderId: "1007884050638"
// };

// var cdata = firebase.database();


// 2. Button for adding contact information
$("#contactSubmit").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var contactName = $("#contactName").val().trim();
  var contactEmail = $("#contactEmail").val().trim();
  var contactPhone = $("#contactPhone").val().trim();
  var contactMessage = $("#contactMessage").val().trim();

  // Creates local "temporary" object for holding contact info
  var contactUs = {
    name: contactName,
    email: contactEmail,
    phone: contactPhone,
    message: contactMessage,
  };

  // Uploads contact info to the database
  cdata.ref().push(contactUs);

  // // Logs everything to console
  // console.log(contactUs.name);
  // console.log(contactUs.email);
  // console.log(contactUs.phone);
  // console.log(contactUs.message);

  // Clears all of the text-boxes
  $("#contactName").val("");
  $("#contactEmail").val("");
  $("#contactPhone").val("");
  $("#contactMessage").val("");
});

// // 3. Create Firebase event for adding to the database and a row in the html when a user adds an entry
// database.ref().on("child_added", function(childSnapshot) {
//   console.log(childSnapshot.val());

//   // // Store everything into a variable.
//   // var cName = childSnapshot.val().name;
//   // var cEmail = childSnapshot.val().email;
//   // var cPhone = childSnapshot.val().phone;
//   // var cMessage = childSnapshot.val().message;

//   //contact Info
//   console.log(cName);
//   console.log(cEmail);
//   console.log(cPhone);
//   console.log(cMessage);

// });




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
var news = '';


//for the News page

function callAPI() {
  fetch(`https://newsapi.org/v2/everything?q=laws+traffic&from=2019-01-01&sortBy=popularity&apiKey=c9952e074181464ea384595ef02c08bd`)
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    // console.log(myJson.articles);
    news = myJson.articles
    // console.log(news)
    console.log(news)
  })
  .then(function () {
    appendNews();
  });
}

callAPI();

var appendNews = function () {
  for (i = 0; i < news.length; i++) {
    $('#newsInfo').append('<h3 id="newsH3">' + news[i].title + '</h3>' + '<p id="news-description">' + news[i].description + '</p>' + '<p>' + '<a href=' + news[i].url + '>' + 'Read More' + '</a>' + '</p>')
    // console.log(news[i].author)
  }
}




// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function () {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.maxHeight) {
//       content.style.maxHeight = null;
//     } else {
//       content.style.maxHeight = content.scrollHeight + "px";
//     }
//   });
// }

