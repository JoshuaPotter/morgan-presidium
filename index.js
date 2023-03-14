import { readdirSync } from 'fs';
import bolt from '@slack/bolt';
import * as dotenv from 'dotenv';

console.log('Morgan v4 (aka "Presidium")');
console.log('[Status] Initializing');

// Load environment variables.
dotenv.config();

// Initializes the app with a bot token and signing secret
const { App } = bolt;
const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	port: process.env.PORT || 3000,
});

// Initialize event listeners
const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
console.log('[Status] Loading events', eventFiles);
for (const file of eventFiles) {
	const event = await import(`./events/${file}`);
	app.event(event.name, (...args) => event.execute(...args));
}

// Initialize command listeners
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
console.log('[Status] Loading commands', commandFiles);
for (const file of commandFiles) {
	const command = await import(`./commands/${file}`);
	app.command(`/${command.name}`, (...args) => command.execute(...args));
}

app.error((error) => {
	// Check the details of the error to handle cases where you should retry sending a message or stop the app
	console.log(error);
});

(async () => {
	// Start the app
	await app.start(process.env.PORT || 3000);

	console.log('[Status] Running...');
})();
