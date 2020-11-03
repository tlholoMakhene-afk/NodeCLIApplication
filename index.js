// node liri.js [ command ] [ query - optional ]
//  var command = process.argv[2];
// var query = process.argv[3];

//A collection of common interactive command line user interfaces. 
//Inquirer module strives to be an easily embeddable and beautiful command line interface and it is similiar to the readline module
const inquirer = require('inquirer');

//here we are adding a function on the exit event for when the application is about to exit/finish
process.on('exit', function() {
    return console.log(`Exiting Application...`);
});

//This function is responsible for the execution of the commands
function ExecuteCommand(command, query)
{
	var apis = require("./api.js");
	// App functionality due to user input
	if(command === "get-tweets") { 
		apis.GetLatestTweets(query);
	} else if(command === "spotify-this-song") {
		apis.spotifyThisSong(query);
	} else if(command === "movie-this") {
		apis.movieThis(query);
	} else if(command === "do-what-it-says") {
		apis.readFileCommand();
	} else if(command === "exit") {
		process.exit();
	} else if(command === undefined) { // use case where no command is given
		console.log("Please select correct command to run.");
	} else { // use case where command is given but not recognized
		console.log("Command not recognized! Please try again.");
	}
}

//this is our questions list object which inquirer uses 
var questions = [
  {
    type: 'input',
    name: 'MenuOption',
    message: "Here are the following options, please enter the associated number to run the command: \n 1. Print Latest Tweets \n 2. Perform a Spotify look-up for a song. \n 3. Query OMDb for movie details. \n 4. Read a query from a text file. \n 5. Exit."
  },
  {
    type: 'input',
    name: 'TwitterUsername',
    message: "Which users tweets should we display?"
  },
  {
    type: 'input',
    name: 'SpotifySongSearch',
    message: "Which song would you like to search?"
  },
  {
    type: 'input',
    name: 'MovieName',
    message: "Which movie would you like to find out about?"
  },
]

//this is the application that is seen on the CLI
function  App()
{
	console.log("===========================================");
	console.log("\t\tWelcome to LIRI.");
	console.log("===========================================");
	inquirer.prompt(questions[0]).then(answer => {//promts the first question in our questions list object
		switch(answer['MenuOption']) {//answer['MenuOption'] in order to get the users input result
			case '1':
				inquirer.prompt(questions[1]).then(answer => {
					ExecuteCommand('get-tweets', answer['TwitterUsername']);//runs the get latest tweets command
				});
			  break;
			case '2':
				inquirer.prompt(questions[2]).then(answer => {
					ExecuteCommand('spotify-this-song', answer['SpotifySongSearch']);//runs the Spotify Song search command
				});
			  break;
			case '3':
				inquirer.prompt(questions[3]).then(answer => {
				  ExecuteCommand('movie-this', answer['MovieName']);//runs the movie name search command
				});
			  break;
			case '4':
				ExecuteCommand('do-what-it-says', null);//runs the command in the textfile 
			  break;
			case '5':
				ExecuteCommand('exit', null);//exits the application
			  break;
			default:
				console.log("Command not recognized! Please try again.");
			  break;
		  }
	})
}


App();//the app is invoked



