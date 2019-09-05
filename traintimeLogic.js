var config = {
    apiKey: "AIzaSyCc8sS0UrW6y-0mNNhKhUQujP5MP57PMpw",
    authDomain: "traintime-77540.firebaseapp.com",
    databaseURL: "https://traintime-77540.firebaseio.com",
    projectId: "traintime-77540",
    storageBucket: "",
    messagingSenderId: "927275654534",
    appId: "1:927275654534:web:23b58d3a105fa867536007"
};

// Initialize Firebase
firebase.initializeApp(config);


var trainData = firebase.database();

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name-input")
    .val()
    .trim();
    var destination = $("#destination-input")
    .val()
    .trim();
    var firstTrain = $("#first-train-input")
    .val()
    .trim();
    var frequency = $("#frequency-input")
    .val()
    .trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    trainData.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    alert("New Train Successfully Added.");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

});


trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tfirstTrain = childSnapshot.val().firstTrain;
    var tFrequency = childSnapshot.val().frequency;

    var timeArr = tfirstTrain.split(":");
    var trainTime = moment()
        .hours(timeArr[0])
        .minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;

    if (maxMoment === trainTime) {
        tArrival = trainTime.format("hh:mm A");
        tMinutes = trainTime.diff(moment(), "minutes");

    } else {

        var differenceTimes = moment().diff(trainTime, "minutes");
        var tRemainder = differenceTimes % tFrequency;
        tMinutes = tFrequency - tRemainder;

        tArrival = moment()
            .add(tMinutes, "m")
            .format("hh:mm A");
    }

    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);

    $("#train-table > tbody").append(
        $("<tr>").append(
            $("<td>").text(tName),
            $("<td>").text(tDestination),
            $("<td>").text(tFrequency),
            $("<td>").text(tArrival),
            $("<td>").text(tMinutes)
        )
    );
});
