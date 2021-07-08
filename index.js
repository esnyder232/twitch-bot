console.log("=== Twitch bot started` ===");



// This is the channel name for the software to connect to.
var channelName = "miles_gloriosus";

var twitchChatMappings = {
	"increase1": "+1",
	"decrease2": "-1",
	"maxlevel": "max",
	"minlevel": "min",
	"baselevel": "base"
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const tmi = require('tmi.js');
//twitch connection
const client = new tmi.Client({
	connection: {
		secure: true,
		reconnect: true
	},
	channels: [ channelName ]
});

client.connect();

client.on("connected", () => {
	console.log("Connected to twitch channel " + channelName + ".");
})
client.on('message', (channel, tags, message, self) => {
	console.log("=============== INCOMING MESSAGE ======================");
	console.log(tags['display-name'] + " - " + message);
	console.log("-------- CHANNEL:");
	console.log(channel);
	console.log("-------- TAGS:");
	console.log(tags);
	console.log("-------- MESSAGE:");
	console.log(message);
	console.log("-------- SELF:");
	console.log(self);

	client.say(channelName, `heya!`);


	//scan message for redeeming points
	// var trimmedMessage = message.toLowerCase().trim();
	// var modCmd = twitchChatMappings[trimmedMessage];
	// if(modCmd !== undefined) {
	// 	var userMessage = changeBikeLevel(modCmd);
	// 	if(userMessage === "") {
	// 		console.log('Changed bike level via chat command. Bike level is now: ' + currentBikeLevel);	
	// 	}
	// }
});
