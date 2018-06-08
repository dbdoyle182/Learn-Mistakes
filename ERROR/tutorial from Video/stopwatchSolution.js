// STOPWATCH ACTIVITY (SOLUTION)
// =============================

// This code will run as soon as the page loads

window.onload = (function () {
  $("#lap").click(stopwatch.recordLap);
  $("#stop").click(stopwatch.stop);
  $("#reset").click(stopwatch.reset);
  $("#start").click(stopwatch.start);
};

  //  Variable that will hold our setInterval that runs the stopwatch
  
var stopwatch = {
    time:0,
    lap:1,
    reset: function(){
      stopwatch.time = 0;
      stopwatch.lap = 1;
      $("#display").html("00:00");
      $("#laps").html("");
    },
    start: function(){
    //function start() {
    // DONE: Use setInterval to start the count here and set the clock to running.
      counter = setInterval(stopwatch.count, 1000);
    
    // if (!clockRunning) {
    //   intervalId = setInterval(count, 1000);
    //   clockRunning = true;
    // }
    },
     stop: function(){
    //function stop() 
       clearInterval(counter);
   
    },
    recordLap: function(){
  //function recordLap() {

        var converted = stopwatch.timeConverter(stopwatch.time);
   // var converted = timeConverter(time);

    // DONE: Add the current lap and time to the "laps" div.
    $("#laps").append("<p>Lap " + stopwatch.lap + " : " + converted + "</p>");

    // DONE: Increment lap by 1. Remember, we can't use "this" here.
    stowatch.lap++;
    },

    count: function() {

      stopwatch.time++;
        //       and save the result in a variable.
      var converted = stopwatch.timeConverter(stopwatch.time);
    

        // DONE: Use the variable we just created to show the converted time in the "display" div.
      $("#display").html(converted);
    },

    timeConverter: function(t) {

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

});
