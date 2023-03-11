const { readdirSync } = require('fs');
const { App } = require('@slack/bolt');

// Load environment variables.
require('dotenv').config();

// Initializes the app with a bot token and signing secret
const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	port: process.env.PORT || 3000,
});

// Initialize event listeners
const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
console.log('[Events] Loading...', eventFiles);
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	app.event(event.name, (...args) => event.execute(...args));
}

// Initialize command listeners
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
console.log('[Commands] Loading...', commandFiles);
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	app.command(`/${command.name}`, (...args) => command.execute(...args));
}

app.error((error) => {
	// Check the details of the error to handle cases where you should retry sending a message or stop the app
	console.log(error);
});

(async () => {
	// Start the app
	await app.start(process.env.PORT || 3000);

	console.log('🚀 Morgan is running');
	console.log('- Version: Citadel');
})();
