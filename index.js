const tmi = require('tmi.js');
const twitchBotOauthToken = require("./configs/twitch-bot-oauth-token.json");

console.log("=== Twitch bot started` ===");

// This is the channel name for the software to connect to.
var channelName = "miles_gloriosus";

var twitchChatMappings = [
	{
		"type": "string",
		"key": "!play",
		"func": playCommand
	},{
		"type": "regex",
		"key": /wanna *become *famous/gi,
		"func": banSpam
	},{
		"type": "string",
		"key": "!coolhole",
		"func": coolholeCommand
	}

]


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

	//scan for twitch commands
	for(var i = 0; i < twitchChatMappings.length; i++) {
		if(twitchChatMappings[i].type === "string") {
			var trimmedMessage = message.toLowerCase().trim();
			var found = trimmedMessage.indexOf(twitchChatMappings[i].key);
			if(found >= 0 && typeof twitchChatMappings[i]["func"] === "function") {
				console.log("Found twitch string command: " + twitchChatMappings[i].key);
				twitchChatMappings[i].func(client, channel, tags, message, self);
			}
		}
		else if (twitchChatMappings[i].type === "regex") {
			var r = /wanna *become *famous/gi;
			var found = message.match(r);
			if(found !== null && typeof twitchChatMappings[i]["func"] === "function") {
				console.log("Found twitch regex command: " + twitchChatMappings[i].key);
				twitchChatMappings[i].func(client, channel, tags, message, self);
			}
		}
	}
});


///////////////////////////////////////////////////////////////////
// Commands
function playCommand(client, channel, tags, message, self) {
	client.say(channel, "https://stockheimergame.com");
}

function coolholeCommand(client, channel, tags, message, self) {
	client.say(channel, "https://coolhole.org");
}


function banSpam(client, channel, tags, message, self) {
	console.log("Attempting to ban " + tags["display-name"]);

	if(tags["display-name"].toLowerCase() !== "not_miles_gloriosus") {
		client.say(channel, "/timeout " + tags["display-name"] + " 500 I'm the only bot allowed in this chat.");
	}
	else {
		console.log("Couldn't ban. Its myself.");
	}
}

///////////////////////////////////////////////////////////////////