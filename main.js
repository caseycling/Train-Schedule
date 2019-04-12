<script src="https://code.jquery.com/jquery.js"></script>
<script src="https://cdn.jsdelivr.net/momentjs/2.12.0/moment.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.9.3/firebase.js"></script>

    var config = {
        apiKey: "AIzaSyDhBHDr9hzWII62XoAbWqvqH75QobldKXg",
        authDomain: "employee-data-management-452ec.firebaseapp.com",
        databaseURL: "https://employee-data-management-452ec.firebaseio.com",
        projectId: "employee-data-management-452ec",
        storageBucket: "employee-data-management-452ec.appspot.com",
        messagingSenderId: "536256276415"
    };

    firebase.initializeApp(config);
    var database = firebase.database();
    var name = "";
    var destination = "";
    var start = 0;
    var nextArrival = 0;
    var minutesAway = 0;
    var frequency = 0; 

    $("#addTrain").on("click", function () {

        event.preventDefault();

        name = $("#trainName").val().trim();
        destination = $("#trainDestination").val().trim();
        strStart = $("#trainStart").val().trim();
        start = parseInt(strStart.replace(strStart.charAt(strStart.length - 3), ''))
        now = parseInt(moment().format('HHmm'))
        frequency = $("#trainFrequency").val().trim();
        time = (now - start)/frequency
        nextArrival = (Math.ceil(time) - time) * time
        console.log(time)           
        console.log(nextArrival)           
        
        database.ref().push({
            name: name,
            destination: destination,
            start: start,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        $(".form-control").val(' ');
        
    });

///Use moment.js to calculate difference in minutes between the current time and the trains departure time
///Ex. var currentTime = 17:00; var departureTime = 16:00; var difference = currentTime - departureTime

///Divide this number by the frequency of the train
///Ex. var frequency = 25; var trainTrips = difference/frequency /// 2.4

///Round the trainTrips up and multiply it by the frequency. Next, add this number to the start time for the next train arrival time 
///Ex. var trainTripsByFrequency = (Math.ceil(trainTrips)) * frequency /// 75
///Ex. var nextTrainTime = start + trainTripsByFrequency

///Round the trainTrips up and subtract it from trainTrips. This will give you the remaining percentage of the frequency until the trains arrival
///Ex. var frequencyRemainder = (Math.ceil(trainTrips)) - trainTrips /// .6

///Multiply frequencyRemainder by frequency for the time until the next train
///Ex. var timeUntilNextTrain = frequencyRemainder * frequency /// .6 * 25 = 15 minutes 

    database.ref().on("child_added", function (snapshot) {
        var snap = snapshot.val();
        console.log(snap)
        $("#currentEmployees").find('tbody')
            .append($('<tr>')
                .append($('<td>').text(snap.name))
                .append($('<td>').text(snap.destination))
                .append($('<td>').text(snap.frequency))
                
            )
    })
