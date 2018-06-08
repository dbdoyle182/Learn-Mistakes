var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Cris1020",
  database: "top_songsDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

var runSearch = function(){
    inquirer.prompt({
        name:"action",
        type:"rawlist",
        message:"what would you like to do ?",
        choices:[
            "Find songs by artist",
            "Find all artists who appear more than once",
            "Find data within a specific range",
            "Search for a specific song",
            "Find artists with a top song and top album in the same year"

        ]
    }).then(function(answer){
        switch(answer){
            case "Find songs by artist":
                artistSearch();
            break;
            case "Find all artists who appear more than once":
                multiSearch();
            break;
            case"Find data within a specific range":
                rangeSearch();
            break;
            case"Search for a specific song":
                songSearch();
            break;
            case"Find artists with a top song and toop album in the same year":
                songAndAlbumSearch();
            break;    
        }
    })
}
var artistSearch = function(){
    inquirer.prompt({
        name:"artist",
        type:"input",
        message:"What artist would you like to search for?",
    }).then(function(answer){
        var query = "SELECT position, song, year FROM top5000 WHERE?";
        connection.query(query, {artist:answer.artist},function(err,res){
            for (var i=0; i<res.length; i++){
                console.log("Position: "+res[i].position+"\nSong: "+res[i].song+"\nYear: "+res[i].year+"\n--------\n");
            }
            runSearch();
        })
    })
}
var multiSearch = function(){
    inquirer.prompt({
        name:"number",
        type:"input",
        message:"What many songs must the artist have on the list?"
    }).then(function(answer){
        var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > "+ answer.number;
        connection.query(query,function(err,res){
            for (var i=0; i<res.length; i++){
                console.log(res[i].artist);
            }
            runSearch();
        })
     })
}
var rangeSearch = function(){
    inquirer.prompt([{
        name:"song",
        type:"input",
        message:"Enter the starting position",
        validate:function(value){
            if (isNaN(value)==false){
                return true;
            }else{
                return false
            }
        }
    },{
        name:"end",
        type:"input",
        message:"Enter the ending position",
        validate: function(value) {
            if (isNaN(value)==false){
                return true;
            }else{
                return false
            }
    }


    }]).then(function(answer){
        var query = "SELECT position, song, artist, year FROM top5000 WHERE position BETWEEN ? AND ?";
        connection.query(query,[answer.start,answer.end],function(err,res){
            for (var i=0; i<res.length; i++){
                console.log("Position: "+res[i].position+"\nSong: "+res[i].song+"\nArtist: "+res[i].artist+"\nYear: "+res[i].year+"\n--------\n");
            }
                    runSearch();    
        })    
    })
}
var songSearch = function(){
    inquirer.prompt({
        name:"song",
        type:"input",
        message:"What song would you like to look for?"
    }).then(function(answer){
        var query = "SELECT * FROM top5000 WHERE?";
        connection.query(query, {song:answer.song},function(err,res){
            console.log("Position: "+res[0].position+"\nArtist: "+res[0].artist+"\nYear: "+res[0].year+"\n--------\n");
            runSearch();
            })
        })
   
}
var songAndAlbumSearch = function(){
    inquirer.prompt({
        name:"artist",
        type:"input",
        message:"What artist would you like to search for?"
    }).then(function(answer){
        var query = "SELECT topalbums.year, topalbums.position,topalbums.album, topalbums.position, top5000.song,top5000.artist FROM topalbums ";
        query+= "INNER JOIN top5000 ON (topalbums.artist = top5000.artist AND topalbums.year = top5000.year) ";
        query+= "WHERE (topalbums.artist = ? AND top5000.artist = ?) ORDER BY topalbums.year ";
        connection.query(query, [answer.artist,answer.artist],function(err,res){
            console.log(res.length+ " Matches Found!");
            for (var i=0; i<res.length; i++){
                console.log("bAlbum Position: "+res[i].position+"\nArtist: "+res[i].artist+"\nSong: "+res[i].song+"\nAlbum: "+res[i].album+"\nYear: "+res[i].year+"\n-------\n");
            }
            runSearch();
        })
    })
}
