const fs = require('fs');
const { App } = require('@slack/bolt');
const { slack_bot_token, slack_signing_secret, slack_app_token } = require('./config.json');

// Initializes your app with your bot token and signing secret
const app = new App({
	token: slack_bot_token,
	signingSecret: slack_signing_secret,
	socketMode: true,
	appToken: slack_app_token,
	port: process.env.PORT || 3000,
});

// Initialize event listeners
const eventFiles = fs.readdir('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	app.event(event.name, (...args) => event.execute(...args));
}

// Initialize command listeners
const commandFiles = fs.readdir('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	app.command(command.name, (...args) => command.execute(...args));
}

app.error((error) => {
	// Check the details of the error to handle cases where you should retry sending a message or stop the app
	console.log(error);
});

(async () => {
	// Start your app
	await app.start(process.env.PORT || 3000);

	console.log('⚡️ Bolt app is running!');
})();
