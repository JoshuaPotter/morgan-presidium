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
	if (actionFiles.length) {
		for (const file of actionFiles) {
			const action = await import(`./${file}`);
			app.action(action.name, (...args) => action.execute(...args));
		}
		console.log('[Status] Actions loaded:', actionFiles);
	}

	// Initialize command listeners
	const commandFiles = await glob('./commands/**/*.js');
	if (commandFiles.length) {
		for (const file of commandFiles) {
			const command = await import(`./${file}`);
			app.command(`/${command.name}`, (...args) => command.execute(...args));
		}
		console.log('[Status] Commands loaded:', commandFiles);
	}

	// Initialize event listeners
	const eventFiles = await glob('./events/**/*.js');
	if (eventFiles.length) {
		for (const file of eventFiles) {
			const event = await import(`./${file}`);
			app.event(event.name, (...args) => event.execute(...args));
		}
		console.log('[Status] Events loaded:', eventFiles);
	}

	// Initialize views listeners
	const viewFiles = await glob('./views/**/*.js');
	if (viewFiles.length) {
		for (const file of viewFiles) {
			const view = await import(`./${file}`);
			app.view(view.name, (...args) => view.execute(...args));
		}
		console.log('[Status] Views loaded:', viewFiles);
	}

	// Register message listeners for messages directed at the bot (app mentions and direct messages). These are things we want the bot to listen for, but not in general conversations between users.
	const mentionFiles = await glob('./messages/mentions/**/*.js');
	if (mentionFiles.length) {
		for (const file of mentionFiles) {
			const message = await import(`./${file}`);

			const handleMessage = async (...args) => {
				const text = args[0].event.text;
				if (message.hears instanceof RegExp) {
					// Listener keyword is a RegExp
					if (message.hears.test(text)) {
						message.execute(...args);
					}
				}
				else {
					// Listener keyword is a string
					const tokens = text.split(' ');
					if (tokens.includes(message.hears)) {
						message.execute(...args);
					}
				}
			};

			app.event('app_mention', (...args) => handleMessage(...args));
			app.event('message', (...args) => {
				if (args[0].event.channel_type === 'im') {
					handleMessage(...args);
				}
			});
		}
		console.log('[Status] Mentions loaded:', mentionFiles);
	}

	// Initialize general message listeners. These listen for instances of words or phrases in any message, even if the bot isn't mentioned directly.
	const messageFiles = await glob('./messages/*.js');
	if (messageFiles.length) {
		for (const file of messageFiles) {
			const message = await import(`./${file}`);
			app.message(message.hears, (...args) => message.execute(...args));
		}
		console.log('[Status] Messages loaded:', messageFiles);
	}

	// Start the app
	await app.start(process.env.PORT || 3000);

	console.log('[Status] Running...');
})();
