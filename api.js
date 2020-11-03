// Load exports from keys.js file which has Twitter auth keys
var keys = require("./keys.js");

// Functions for 3 main functions of the app
// 	--> do-what-it-says requires the use of functions
var GetLatestTweets = function(tweetQuery) {

    try {
        // Load twitter module from npm
	const twitter = require('twitter');          
	// From exports of keys.js file
	const twitterClient = new twitter(keys.twitterKeys); 

	// if no tweetQuery is passed in, then we will be querying for this particular username
	if(tweetQuery === undefined || tweetQuery === null) {
		tweetQuery = "premierleague";
	}
	// Twitter API parameters
	var params = {
		screen_name: tweetQuery,
		count: 20
	};

	// GET request for last 20 tweets on my account's timeline
	twitterClient.get('statuses/user_timeline', params, function(error, data) {
		if(error) { // if there IS an error
			console.log('Error occurred: ' + error);
		} else { // if there is NO error
	  	console.log(`${tweetQuery} 20 Most Recent Tweets`);
	  	console.log("");

	  	for(var i = 0; i < data.length; i++) {
	  		console.log("( #" + (i + 1) + " )  " + data[i].text);
	  		console.log("Created:  " + data[i].created_at);
	  		console.log("");
	  	}
	  }
	});
      }
      catch (e) {
        console.log("Exception Catch");
        console.log(e);//better exception handling
      }
}

var spotifyThisSong = function(trackQuery) {

try {
    // Load Spotify npm package
	const spotify = require('node-spotify-api');      
    const spotifyClient = new spotify(keys.spotifyKeys); 

	// if no trackQuery is passed in, then we will be querying for this particular song
	if(trackQuery === undefined) {
		trackQuery = "the sign ace of base";
	}

	// Spotify API request (if an object is returned, output the first search result's artist(s), song, preview link, and album)
	spotifyClient.search({ type: 'track', query: trackQuery }, function(error, data) {
	    if(error) { // if error
	        console.log('Error occurred: ' + error);
	    } else { // if no error
			// For loop is for when a track has multiple artists
				for(var i = 0; i < data.tracks.items[0].artists.length; i++) {
					if(i === 0) {
						console.log("Artist(s):    " + data.tracks.items[0].artists[i].name);
					} else {
						console.log("              " + data.tracks.items[0].artists[i].name);
					}
				}
				console.log("Song:         " + data.tracks.items[0].name);
				console.log("Preview Link: " + data.tracks.items[0].preview_url);
				console.log("Album:        " + data.tracks.items[0].album.name);
	    }
	 
	 		
	});
  }
  catch (e) {
    console.log("Exception");
    console.log(e);//better exception handling
  }
	
}

var movieThis = function(movieQuery) {
    
try {
    // Load request npm module
	var request = require("request");

	// if query that is passed in is undefined, Mr. Nobody becomes the default
	if(movieQuery === undefined) {
		movieQuery = "mr nobody";
	}

	// HTTP GET request
	request( "http://www.omdbapi.com/?t=" + movieQuery + '&apikey=' + keys.omdbapi.api_key +"&y=&plot=short&r=json", function(error, response, body) {
	  if (!error && response.statusCode === 200) {
	    console.log("* Title of the movie:         " + JSON.parse(body).Title);
	    console.log("* Year the movie came out:    " + JSON.parse(body).Year);
	    console.log("* IMDB Rating of the movie:   " + JSON.parse(body).imdbRating);
	    console.log("* Country produced:           " + JSON.parse(body).Country);
	    console.log("* Language of the movie:      " + JSON.parse(body).Language);
	    console.log("* Plot of the movie:          " + JSON.parse(body).Plot);
	    console.log("* Actors in the movie:        " + JSON.parse(body).Actors);

	    // For loop parses through Ratings object to see if there is a RT rating
	    // 	--> and if there is, it will print it
	    for(var i = 0; i < JSON.parse(body).Ratings.length; i++) {
	    	if(JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
	    		console.log("* Rotten Tomatoes Rating:     " + JSON.parse(body).Ratings[i].Value);
	    		if(JSON.parse(body).Ratings[i].Website !== undefined) {
	    			console.log("* Rotten Tomatoes URL:        " + JSON.parse(body).Ratings[i].Website);
	    		}
	    	}
	    }
	  } else { console.log(error);}
	});
  }
  catch (e) {
    console.log("Exception");
    console.log(e);//better exception handling
  }	
}

//this is the do-what-it-says function which reads the command from the file 
var readFileCommand = function() {
    
    try {
       // App functionality from file read / loads fs npm package
	var fs = require("fs");

	fs.readFile("random.txt", "utf-8", function(error, data) {
		var command;
		var query;
		if(!error)
		{	
		// If there is a comma, then we will split the string from file in order to differentiate between the command and query
		// 	--> if there is no comma, then only the command is considered (my-tweets)
		if(data.indexOf(",") !== -1) {
			var dataArr = data.split(",");
			command = dataArr[0];
			query = dataArr[1];
		} else {
			command = data;
		}

		// After reading the command from the file, decides which app function to run
		if(command === "my-tweets") {
            GetLatestTweets(query);
		} else if(command === "spotify-this-song") {
			spotifyThisSong(query);
		} else if(command === "movie-this") {
			movieThis(query);
		} else { // Use case where the command is not recognized
			console.log("Command from file is not a valid command! Please try again.");
		}
	}
	});
      }
      catch (e) {
        console.log("Exception");
        console.log(e);//better exception handling
      }	
}

module.exports = {
     GetLatestTweets,spotifyThisSong,movieThis,readFileCommand
}