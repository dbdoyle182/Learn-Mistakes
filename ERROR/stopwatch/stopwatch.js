// STOPWATCH ACTIVITY (SOLUTION)
// =============================

// This code will run as soon as the page loads

$(document).ready(function () {
  $("#lap").on("click", recordLap);
  $("#stop").on("click", stop);
  $("#reset").on("click", reset);
  $("#start").on("click", start);

  //  Variable that will hold our setInterval that runs the stopwatch
  var intervalId;

  // prevents the clock from being sped up unnecessarily
  var clockRunning = false;

  var time = 0;

  var lap = 1;

  function reset() {
  
    stopwatch.time = 0;
    stopwatch.lap = 1;

    $("#display").html("00:00");
    
    $("#lap").html("");
  }

  function start() {
    
    counter = setInterval (stopwatch.count, 1000);
  }

  function stop() {
    clearInterval(counter);

  }

  function recordLap() {

    var converted =stopwatch.timeConverter(stopwatch.time);
    $("#lap").append("<p>" + stopwatch.lap + " : " + converted + "</p>")
    stopwatch.time++;
  }

  function count() {
    //Increment by 1
    stopwatch.time++;
    // Get the current time, pass that into the stopwacth.timeConvert than save in a variable
     var converted =stopwatch.timeConverter(stopwatch.time);

     // Show the time to the users
     $("#display").html(converted);
  }

  function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
})
