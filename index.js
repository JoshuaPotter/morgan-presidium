import bolt from '@slack/bolt';
import * as dotenv from 'dotenv';
import loadMethods from './lib/loadMethods.js';
import loadScheduledJobs from './lib/loadScheduledJobs.js';

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
	// Load methods into the app instance
	await loadMethods(app);
	await loadScheduledJobs(app.client);

	// Start the app
	await app.start(process.env.PORT || 3000);

	console.log('[Status] Running...');
})();
