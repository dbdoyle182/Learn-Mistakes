$("#start").on("click", function(){
   game.start(); 
 })

var questions = [{
    question:"What is SQL Server?",
    answers:["SQL Server is one of the Database Management Systems DBMS and is designed by Microsoft", "DBMS are computer software applications with the capability of interacting with user, various other applications as well as the database itself","Both answer are correct"],
    correctAnswer: "Both answer are correct"
},{
    question:"What is traditional Network Library for the system?",
    answers:["In either Windows or POSIX systems the named pipes provide ways of inter-process communications to connect different processes running on the same machine","It dispenses with the necessity of using the network stack and data can be sent without affecting the performance","Servers set up named pipes to listen to requests. Client process needs to know the specific pipe name to send the request"," All of above"],
    correctAnswer:"All of above"
},{
    question:"What is the default port for MySQL Server?",
    answers:["default port for MySQL Server is 3006","default port for MySQL Server is 3316","default port for MySQL Server is 3306"],
    correctAnswer:"default port for MySQL Server is 3306"
},{
    question:"What is the abbreviation DDL?",
    answers:["DDL is the abbreviation for Database Data Language","DDL is the abbreviation for Data Definition Language","DDL is the abbreviation for Data Database Language"],
    correctAnswer:"DDL is the abbreviation for Data Definition Language"
},{
    question:"What are meant by Joins in MySQL?",
    answers:["Participate in MYSQL Community","Download the Software and use it","In MySQL the Joins are used to query data from two or more tables. The query is made using relationship between certain columns existing in the table. There are four types of Joins in MySQL."],
    correctAnswer:"In MySQL the Joins are used to query data from two or more tables. The query is made using relationship between certain columns existing in the table. There are four types of Joins in MySQL."
},{
    question:"What are the common MySQL functions?",
    answers:["CONCAT (X, Y)/,DATEDIFF (X, Y)/,CURRDATEO"," CREATE Tables","CHAR and VARCHAR"],
    correctAnswer:"CONCAT (X, Y)/,DATEDIFF (X, Y)/,CURRDATEO"
},{
    question:"What is the difference between CHAR and VARCHAR?",
    answers:["When the table is created, CHAR and VARCHAR are used to define the fixed length of the table and columns. The length value could be in the range of 1-255.","When the table is created, CHAR is used to define the fixed length of the table and columns. The length value could be in the range of 1-255. VARCHAR command is given to adjust the column and table length as required.","VARCHAR and CHAR used command is given to adjust the column and table length as required."],
    correctAnswer:"When the table is created, CHAR is used to define the fixed length of the table and columns. The length value could be in the range of 1-255. VARCHAR command is given to adjust the column and table length as required."
},{
    question:" What is the syntax for concatenating tables in MySQL?",
    answers:["The syntax for concatenating tables is MySQL is CONCAT (string 1, string 2, string 3","The syntax for concatenating tables is MySQL is JOIN (string 1, string 2, string 3"],
    correctAnswer:"The syntax for concatenating tables is MySQL is CONCAT (string 1, string 2, string 3"
},{
    question:" What are the different types of strings in Database columns in MySQL?",
    answers:["SET, BLOB, VARCHAR, TEX, ENUM, and CHAR.","INSERT INTO, INTEGER, VARCHAR, TEX, ENUM, and CHAR.","SET, DROP DATABASE, VARCHAR, TEX,INSERT INTO, and CHAR."],
    correctAnswer:"SET, BLOB, VARCHAR, TEX, ENUM, and CHAR."
},{
    question:"How will you delete a table?",
    answers:["To delete a specific table use the command on mysql shell as: drop table table_name;", "To delte a specific table use the command on mysql shell as: * DELETE table table_name;"],
    correctAnswer:"To delete a specific table use the command on mysql shell as: drop table table_name;"

}];
var game = {
    correct: 0,
    incorrect:0,
    counter:20,
    countdown:function(){
        game.counter--;
        $("#counter").html(game.counter);
        if(game.counter<=0){
            console.log("Time is Up!");
            game.done();
        }
    },
    start: function(){
        timer = setInterval(game.countdown, 1000);
        $("#sub-wrapper").prepend('<h2>Time Remaining:<span id ="counter">120</span> Seconds</h2>');
        $("#start").remove();
            for(var i=0; i<questions.length; i++){
            $("#sub-wrapper").append("<h3>" + questions[i].question+ "</h3>"+ "</br>");
            for( var j=0; j<questions[i].answers.length;j++){
                $("#sub-wrapper").append("</br>" + "<input type='radio' name= 'question-"+i+"'value='"+questions[i].answers[j]+"'>"+questions[i].answers[j] + "</br>")
        }
    }
        $("#sub-wrapper").append("<br><button id= 'end'>DONE</button>")
    },
        done: function(){
            $.each($('input[name="question-0]":checked'),function(){
                if($(this).val()==questions[0].correctAnswer){
                    game.correct++;
                }else{
                    game.incorrect++;
                }
            });
            $.each($('input[name="question-1]":checked'),function(){
                if($(this).val()==questions[1].correctAnswer){
                    game.correct++;
                }else{
                    game.incorrect++;
                }
            });
            $.each($('input[name="question-2]":checked'),function(){
                if($(this).val()==questions[2].correctAnswer){
                    game.correct++;
                }else{
                    game.incorrect++;
                }
            });
            $.each($('input[name="question-3]":checked'),function(){
                if($(this).val()==questions[3].correctAnswer){
                    game.correct++;
                }else{
                    game.incorrect++;
                }
            });
            $.each($('input[name="question-4]":checked'),function(){
                if($(this).val()==questions[4].correctAnswer){
                    game.correct++;
                }else{
                    game.incorrect++;
                }
            });
            $.each($('input[name="question-5]":checked'),function(){
                if($(this).val()==questions[5].correctAnswer){
                    game.correct++;
                }else{
                    game.incorrect++;
                }
            });
            $.each($('input[name="question-6]":checked'),function(){
                if($(this).val()==questions[6].correctAnswer){
                    game.correct++;
                }else{
                    game.incorrect++;
                }
            });
            $.each($('input[name="question-7]":checked'),function(){
                if($(this).val()==questions[7].correctAnswer){
                    game.correct++;
                }else{
                    game.incorrect++;
                }
            });
            $.each($('input[name="question-8]":checked'),function(){
                if($(this).val()==questions[8].correctAnswer){
                    game.correct++;
                }else{
                    game.incorrect++;
                }
            });
            $.each($('input[name="question-9]":checked'),function(){
                if($(this).val()==questions[9].correctAnswer){
                    game.correct++;
                }else{
                    game.incorrect++;
                }
            });
            $.each($('input[name="question-10]":checked'),function(){
                if($(this).val()==questions[10].correctAnswer){
                    game.correct++;
                }else{
                    game.incorrect++;
                }
            });
            this.result();
    },
    result:function(){

        clearInterval(timer);

        $("#sub-wrapper h2").remove();
        
        $("#sub-wrapper").html("<h2> All done!</h2>");
        $("#sub-wrapper").append("<h3> Correct Answers: "+ this.correct+"</h3>");
        $("#sub-wrapper").append("<h3> Incorrect Answers: "+ this.incorrect+"</h3>");
        $("#sub-wrapper").append("<h3> Unanswered: "+ (questions.length-(this.incorrect+this.correct))+"</h3>");

    }
}