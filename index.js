import bolt from '@slack/bolt';
import * as dotenv from 'dotenv';
import glob from 'glob';

console.log('Morgan v4 (aka "Presidium")');
console.log('[Status] Initializing...');

// Load environment variables.
dotenv.config();

// Initializes the app with a bot token and signing secret
const { App } = bolt;
const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	port: process.env.PORT || 3000,
});

app.error((error) => {
	// Check the details of the error to handle cases where you should retry sending a message or stop the app
	console.log(error);
});

(async () => {
	// Initialize event listeners
	// const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
	const eventFiles = await glob('./events/**/*.js');
	for (const file of eventFiles) {
		const event = await import(`./${file}`);
		app.event(event.name, (...args) => event.execute(...args));
	}
	console.log('[Status] Events loaded:', eventFiles);
	
	// Initialize command listeners
	// const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
	const commandFiles = await glob('./commands/**/*.js');
	for (const file of commandFiles) {
		const command = await import(`./${file}`);
		app.command(`/${command.name}`, (...args) => command.execute(...args));
	}
	console.log('[Status] Commands loaded:', commandFiles);

	// Start the app
	await app.start(process.env.PORT || 3000);

	console.log('[Status] Running...');
})();
