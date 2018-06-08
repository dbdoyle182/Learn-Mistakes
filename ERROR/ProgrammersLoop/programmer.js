var inquirer = require('inquirer');
function Programmer(name,position,age,language){
    this.name = name;
    this.position = position;
    this.age = age;
    this.language = language;

    this.prinInfo = function(){
        console.log("Name:"+this.name+"\nPosition: "+this.position+"\nAge:"+this.age+"\nLanguage: "+this.language);
    }
}
var count = 0;
var aaskQuestion = function(){
    if(count < 2){
    inquirer.prompt([{
        name:"name",
        message:"What is your Name?",
    },{
        name:"position",
        message:"What is your position?",

    },{
        name:"age",
        message:"What is your Age?",


    },{
        name:"language",
        message:"What is your favorite programming language?",

    }]).then(function(answers){
        var newGuy = Programmer(answers.name,answers.answers.position,answers.age,answers.language);
        newGuy.prinInfo();
        count++;
        aaskQuestion();
    })
}else{
    console.log("all done!");
    }
}
aaskQuestion();
