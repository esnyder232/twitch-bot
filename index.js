const tmi = require('tmi.js');
const twitchBotOauthToken = require("./configs/twitch-bot-oauth-token.json");

console.log("=== Twitch bot started` ===");

// This is the channel name for the software to connect to.
var channelName = "miles_gloriosus";

var twitchChatMappings = {
	"!play": playCommand,
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////


//twitch connection
const client = new tmi.Client({
	connection: {
		secure: true,
		reconnect: true
	},
	identity: {
		username: "Not_Miles_Gloriosus",
		password: twitchBotOauthToken.oauthToken
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
	// console.log("-------- CHANNEL:");
	// console.log(channel);
	// console.log("-------- TAGS:");
	// console.log(tags);
	// console.log("-------- MESSAGE:");
	// console.log(message);
	// console.log("-------- SELF:");
	// console.log(self);

	//scan message for redeeming points
	var trimmedMessage = message.toLowerCase().trim();
	var modCmd = twitchChatMappings[trimmedMessage];
	if(modCmd !== undefined && typeof modCmd === "function") {
		modCmd(client, channel, tags, message, self);
	}
});


///////////////////////////////////////////////////////////////////
// Commands
function playCommand(client, channel, tags, message, self) {
	client.say(channel, "https://stockheimer.dontcodethis.com");
}

///////////////////////////////////////////////////////////////////