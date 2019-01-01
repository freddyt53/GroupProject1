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


//first submit button
$('#submitCitation1').on("click", function (event) {
  event.preventDefault();

  //user input
  var citationNumber = $("#citationNumberInput").val().trim();


  //local var to hold the user information
  var newCitation1 = {
    citationNumber: citationNumber,
  }

  //pushes data to database
  groupData.ref().push(newCitation1);

  //console.logs
  console.log(newCitation1.citationNumber);



  // Clears all of the text-boxes
  $("#citationNumberInput").val("");

  //keeps from refreshing page
  return false;

});


//second submit button function
$('#submitCitation2').on("click", function (event) {
  event.preventDefault();

  //user input
  var stateOfCitation = $("#stateOfCitation").val().trim();
  var licensePlate = $("#licenseInput").val().trim();

  //local var to hold the user information
  var newCitation2 = {
    stateOfCitation: stateOfCitation,
    licensePlate: licensePlate,
  }

  //pushes data to database
  groupData.ref().push(newCitation2);

  //console.logs
  console.log(newCitation2.stateOfCitation);
  console.log(newCitation2.licensePlate);


  // Clears all of the text-boxes
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




var data = "";


fetch('https://data.lacity.org/resource/8yfh-4gug.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    //console.log(JSON.stringify(myJson));
    data = myJson
  });
  // function removeZeros (str) {
  //   str.split("")
  // }

  $('#submitCitation3').on("click", function (event) {
    var input = $("#searchInput").val().trim();
    var ticketDetails = $("#ticketInfo")
    event.preventDefault();
    console.log(data);

    
    for (var i = 0; i < data.length; i++) {
      var matchFound = false;
      if(input === data[i].ticket_number) {
        matchFound = true;
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
    //  if(matchFound == false) {
    //   alert("Ticket not found");
    
    // }
    
  });
  

// fetch('https://data.lacity.org/resource/8yfh-4gug.json')
//   .then(function (response) {
//     return response.json();
//   });
//   //.then(function (myJson) {
//     //response.data.forEach(function (element) {
//      //newDiv = $("<div>");
//       //new.addClass("info-container");
//       //newDiv.append("<p>Citation Number " + element.ticket_number + "</p>");
//       //$("#datalist").append(newDiv);
//     //});

//     //console.log(JSON.stringify(myJson));
//   //});

// var violaion = ["location", "issueDate", "issueTime", "ticketNumber", "violationDescription"]



// function notifyMe() {
//   if(!("Notification" in window)) {
//     alert("This browser does not support system notifications");
//   }
//   else if (Notification.permission === "granted") {
//     notifyMe();
//   }
//   else if (Notification.permission !== "denied") {
//     Notification.requestPermission(function(permission) {
//       if (permission === "granted") {
//         notifyMe();
//       }
//     });
//   }
//   function notify() {
//     var notification = new Notification("Hello there", {
//       icon: 'http://carnes.cc/jsnuggets_avatar.jpg',
//       body: "Hey there this is a test",
//     });
//     notification.onclick = function () {
//       window.open("http://carnes.cc");
//     };
//     setTimeout(notification.close.bind(notification), 7000);
//   }
//   console.log(notify);
// }




//for the News page
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
