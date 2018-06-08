var keys = require("./keys.js");

require("dotenv").config(); 

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Possible commands for this liri app
// Grab keys from keys.js


// fs is used in all cases to write to log.txt
var fs = require('fs');

// my-tweets --> show your last 20 tweets with creation time
if (process.argv[2] === "my-tweets") {
        getMyTweets();
    }
// spotify-this-song --> add argument '<song name>'; show the Artist(s), song name, preview link of the song from Spotify, the album the song is from. If no song specified, default to "The Sign" by Ace of Base.
else if (process.argv[2] === "spotify-this-song") {
    getSpotifySong();
} 
// movie-this -->  add argument '<movie name>'; show the movie title, year of release, IMDB rating, Rotten Tomatoes Rating, country of origin, language, plot, and actors in movie. If no movie specified, choose "Mr. Nobody."
else if (process.argv[2] === "movie-this") {
    getMovie();
}
// do-what-it-says
else if (process.argv[2] === "do-what-it-says") {
    fs.readFile('random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        var input = data.split(",");
        console.log(input[1]);
        getSpotifySong(input[1]);
    });
}

function getMyTweets() {
    var twitter = require('twitter');
    var twitterKeys = keys.twitterKeys;
    var client = new twitter(twitterKeys);
    var params = {screen_name: 'realDonaldTrump', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at + ":  " + tweets[i].text + "\n");
                fs.appendFile('log.txt', tweets[i].created_at + ": " + tweets[i].text + "\n", (err) => {
                    if (err) throw err;
                });
            }
            fs.appendFile('log.txt', "------------------------------------------------------------------------------------------------------------------------\n", (err) => {
                if (err) throw err;
            });
        }
        else console.log("Error occurred: " + error)
    });
}

function getSpotifySong(input) {
    var spotifyKeys = keys.spotifyKeys;
    var spotify = require('node-spotify-api');
    var client = new spotify({
        id: spotifyKeys.client_id,
        secret: spotifyKeys.client_secret
    });
    var song;
    if (process.argv.length < 4 && input == undefined) song = 'The Ace of Base';
    else if (input != undefined && process.argv.length < 4) song = input;
    else song = process.argv.slice(3, process.argv.length);
    client.search({type: 'track', query: song}, function(err, data){
        if (err) return console.log('Error occurred: ' + err);
        var returnTrack = data.tracks.items[0];
        console.log("Artist(s):");
        for (i = 0; i < returnTrack.artists.length; i++) {
            console.log(returnTrack.artists[i].name);
            fs.appendFile('log.txt', "Artist(s): " + returnTrack.artists[i].name + "\n", (err) => {
                if (err) throw err;
            });
        }
        console.log("");
        fs.appendFile('log.txt', "", (err) => {
            if (err) throw err;
        });
        console.log("Song title: ");
        console.log(returnTrack.name + "\n");
        console.log("Preview link: ");
        console.log(returnTrack.preview_url + "\n");
        console.log("Album title: ");
        console.log(returnTrack.album.name);
        fs.appendFile('log.txt', "Song title: " + returnTrack.name + "\n" + "Preview link: " + returnTrack.preview_url + "\n" + 
        "Album title: " + returnTrack.album.name + "\n" + "------------------------------------------------------------------------------------------------------------------------\n",
        (err) => {
            if (err) throw err;
        });
    });
}

function getMovie() {
    var omdbKey = keys.omdbKey;
    var request = require('request');
    var movieTitle;
    if (process.argv.length < 4) movieTitle = 'Mr. Nobody';
    else movieTitle = process.argv.slice(3, process.argv.length);
    var omdbURL = 'http://www.omdbapi.com/?apikey=' + omdbKey + '&t=' + movieTitle + '&type=movie';
    request(omdbURL, function(error, response, rbody){
        if (error) console.log('Error occurred: ' + error);
        body = JSON.parse(rbody);
        console.log('Title: ');
        console.log(body.Title + "\n");
        console.log('Year released: ');
        console.log(body.Year + "\n");
        console.log('IMDB rating: ');
        console.log(body.Ratings[0].Value + "\n");
        console.log('Rotten Tomatoes rating: ');
        console.log(body.Ratings[1].Value + "\n");
        console.log('Countries produced in: ');
        console.log(body.Country + "\n");
        console.log("Language: ");
        console.log(body.Language + "\n");
        console.log("Plot: ");
        console.log(body.Plot + "\n");
        console.log("Starring: ");
        console.log(body.Actors);
        fs.appendFile('log.txt', "Title: " + body.Title + "\n" + "Year released: " + body.Year + "\n" + "IMDB rating: " + 
        body.Ratings[0].Value + "\n" + "Rotten Tomatoes rating: " + body.Ratings[1].Value + "\n" + "Countries produced in: " 
        + body.Country + "\n" + "Language: \n" + body.Language + "\n" + "Plot: \n" + body.Plot + "\n" + "Starring: \n" 
        + body.Actors + "\n" + "------------------------------------------------------------------------------------------------------------------------\n", (err) => {
            if (err) throw err;
        });
    });
}