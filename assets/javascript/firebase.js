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
    var startTrainUnix = moment(startTrain, "HH:mm").format("X");

    console.log(trainName)
    console.log(destination)
    console.log(startTrain)
    console.log(frequency)
    console.log(startTrainUnix)

    if (trainName && destination && startTrain && frequency){

    
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");

    database.ref().push({
        trainName: trainName,
        destination: destination,
        startTrainUnix: startTrainUnix,
        frequency: frequency
        
    });
    }

    else{
        console.log("empty form");
    }
});

database.ref().on("child_added", function(snapshot) {
    var sv= snapshot.val();

    console.log(sv.trainName);
      console.log(sv.destination);
      console.log(sv.startTrainUnix);
      console.log(sv.frequency);

    var startTimeObj = moment.unix(sv.startTrainUnix);
    console.log(startTimeObj);

//startTime 12pm
//frequency 10 mins
//now 3:03 mil 15:03
//3:03(60*3=180)+3=183mins
// 183/frequency=183/10=18 remainder 3
//frequency - remainder= 10-3 =7 til next train 

    var now= moment();
    console.log (now)
    var diff= now.diff(startTimeObj, "minutes");
    console.log(diff)
    var remainder= diff % sv.frequency
    console.log(remainder)
    var minNextTrain= sv.frequency - remainder;
    console.log(minNextTrain);
    var nextArrivalObj= now.add(minNextTrain, "minutes");
    console.log(nextArrivalObj);
    var nextArrival= moment(nextArrivalObj).format("HH:mm");
    console.log(nextArrival);









    var table =$("<tr>");

    var tName = $("<td>").text(sv.trainName);
    var tDest = $("<td>").text(sv.destination);
    var tFrequency = $("<td>").text(sv.frequency);
    var tNextTrain = $("<td>").text(nextArrival);
    var minAway = $("<td>").text(minNextTrain);
    
    table.append(tName);
    table.append(tDest);
    table.append(tFrequency);
    table.append(tNextTrain);
    table.append(minAway);

    $("tbody").append(table);
});

// var startTime = tStart;
// var timeFormat = moment("HH:mm");
// var remainingTime = tNextTrain;
