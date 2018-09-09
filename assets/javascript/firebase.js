var config = {
    apiKey: "AIzaSyBXfiJieF9EbpUQ61J-iNEjg9Q5Zq0WGBU",
    authDomain: "train-schedule-87325.firebaseapp.com",
    databaseURL: "https://train-schedule-87325.firebaseio.com",
    projectId: "train-schedule-87325",
    storageBucket: "train-schedule-87325.appspot.com",
    messagingSenderId: "673744482332"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#add-train-btn").on("click", function(event){
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var startTrain = $("#start-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    console.log(trainName)
    console.log(destination)
    console.log(startTrain)
    console.log(frequency)

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");

    database.ref().push({
        trainName: trainName,
        destination: destination,
        startTrain: startTrain,
        frequency: frequency,
        nextTrain: nextTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("child_added", function(snapshot) {
    var sv= snapshot.val();

    console.log(sv.trainName);
      console.log(sv.destination);
      console.log(sv.startTrain);
      console.log(sv.frequency);

    var table =$("tr");

    var tName = $("<td>").text(sv.trainName);
    var tDest = $("<td>").text(sv.destination);
    var tStart = $("<td>").text(sv.startTrain);
    var tFrequency = $("<td>").text(sv.frequency);
    var tNextTrain = $("<td>").text(sv.nextTrain);
    
    
    table.append(tName);
    table.append(tDest);
    table.append(tStart);
    table.append(tFrequency);
    table.append(tNextTrain);

});

var startTime = tStart;
var timeFormat = moment("HH:mm");
var remainingTime = tNextTrain;
