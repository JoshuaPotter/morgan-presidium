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

	// Initialize action listeners
	const actionFiles = await glob('./actions/**/*.js');
	for (const file of actionFiles) {
		const action = await import(`./${file}`);
		app.action(action.name, (...args) => action.execute(...args));
	}
	console.log('[Status] Actions loaded:', actionFiles);

	// Initialize command listeners
	const commandFiles = await glob('./commands/**/*.js');
	for (const file of commandFiles) {
		const command = await import(`./${file}`);
		app.command(`/${command.name}`, (...args) => command.execute(...args));
	}
	console.log('[Status] Commands loaded:', commandFiles);

	// Initialize event listeners
	const eventFiles = await glob('./events/**/*.js');
	for (const file of eventFiles) {
		const event = await import(`./${file}`);
		app.event(event.name, (...args) => event.execute(...args));
	}
	console.log('[Status] Events loaded:', eventFiles);

	// Initialize views listeners
	const viewFiles = await glob('./views/**/*.js');
	for (const file of viewFiles) {
		const view = await import(`./${file}`);
		app.view(view.name, (...args) => view.execute(...args));
	}
	console.log('[Status] Views loaded:', viewFiles);

	// Start the app
	await app.start(process.env.PORT || 3000);

	console.log('[Status] Running...');
})();
