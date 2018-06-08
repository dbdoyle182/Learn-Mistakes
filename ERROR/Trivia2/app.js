$("#start").on("click", function(){
    $("#start").remove();
    game.loadQuestion();
})
$(document).on('click','.answer-button',function(e){
    game.clicked(e);
})
$(document).on('click', '#reset',function(){
    game.reset();
})
// Question set
var questions = [{
  question: "What was the first full length CGI movie?",
  answers: ["A Bug's Life", "Monsters Inc.", "Toy Story", "The Lion King"],
  correctAnswer: "Toy Story"
}, {
  question: "Which of these is NOT a name of one of the Spice Girls?",
  answers: ["Sporty Spice", "Fred Spice", "Scary Spice", "Posh Spice"],
  correctAnswer: "Fred Spice"
}, {
  question: "Which NBA team won the most titles in the 90s?",
  answers: ["New York Knicks", "Portland Trailblazers", "Los Angeles Lakers", "Chicago Bulls"],
  correctAnswer: "Chicago Bulls"
}, {
  question: "Which group released the hit song, \"Smells Like Teen Spirit\"?",
  answers: ["Nirvana", "Backstreet Boys", "The Offspring", "No Doubt"],
  correctAnswer: "Nirvana"
}, {
  question: "Which popular Disney movie featured the song, \"Circle of Life\"?",
  answers: ["Aladdin", "Hercules", "Mulan", "The Lion King"],
  correctAnswer: "The Lion King"
}, {
  question: "Finish this line from the Fresh Prince of Bel-Air theme song: \"I whistled for a cab and when it came near, the license plate said...\"",
  answers: ["Dice", "Mirror", "Fresh", "Cab"],
  correctAnswer: "Fresh"
}, {
  question: "What was Doug's best friend's name?",
  answers: ["Skeeter", "Mark", "Zach", "Cody"],
  correctAnswer: "Skeeter"
}, {
  question: "What was the name of the principal at Bayside High in Saved By The Bell?",
  answers: ["Mr.Zhou", "Mr.Driggers", "Mr.Belding", "Mr.Page"],
  correctAnswer: "Mr.Belding"
}];

var game = {
    questions:questions,
    currentQuestion:0,
    counter:30,
    correct:0,
    incorrect:0,
    unanswered:0,
    countdown:function(){
        game.counter--;
        $("#counter").html(game.counter);
        if(game.counter<=0){
            console.log("Time UP!");
            game.timeUp();
        }

    },
    loadQuestion: function(){
        timer = setInterval(game.countdown,1000);
        $("#sub-wrapper").html(" <h2> Time Remaining <span id='counter'>30</span>Seconds</h2>");
        $("#sub-wrapper").append("<h2>"+questions[game.currentQuestion].question + "</h2>");
        for (var i=0;i<questions[game.currentQuestion].answers.length;i++){
         $('#sub-wrapper').append('<button class="answer-button" id="button-'+i+'"data-name="'+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
        }
    },
    nextQuestion: function(){
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();

    },
    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        $('#sub-wrapper').html('<h2>OUT OF TIME!</h2>');
        $('#sub-wrapper').append('<h3>The correct Answer Was:'+questions[game.currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        }else{
            setTimeout(game.nextQuestion,3*1000);
        }

    },
    results: function(){
        clearInterval(timer);
        $('#sub-wrapper').html('<h2>All Done!</h2>');
        $('#sub-wrapper').append('<h3>Correct:"+game.correct+"</h3>');
        $('#sub-wrapper').append('<h3>Incorrect:"+game.incorrect+"</h3>');
        $('#sub-wrapper').append('<h3>Unanswered: "+game.unanswered+"</h3>');
        $("#sub-wrapper").append("<button id='reset'>RESET</button>");


    },
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data('name')==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
        }else{
            game.answeredIncorrectly();
        }

    },
    answeredCorrectly: function(){
        console.log('YOU GOT IT !');
        clearInterval(timer);
        game.correct++;
        $('#sub-wrapper').html('<h2>You GOT IT RIGHT!</h2>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        }else{
            setTimeout(game.nextQuestion,3*1000);
        }

    },
    answeredIncorrectly: function(){
        console.log("Wrong!");
        clearInterval(timer);
        game.incorrect++;
        $('#sub-wrapper').html('<h2>Wrong!</h2>');
        $('#sub-wrapper').append('<h3>The correct Answer Was:'+questions[game.currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        }else{
            setTimeout(game.nextQuestion,3*1000);
        }

    },
    reset: function(){
        game.currentQuestion = 0;
        game.counter = 0 ;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    }
}
