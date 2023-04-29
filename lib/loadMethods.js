import glob from 'glob';

export default async function loadMethods(app) {
	// Initialize action listeners
	const actionFiles = await glob('./actions/**/*.js');
	if (actionFiles.length) {
		for (const file of actionFiles) {
			const action = await import(`../${file}`);
			app.action(action.name, (...args) => action.execute(...args));
		}
		console.log('[Status] Actions loaded:', actionFiles);
	}

	// Initialize command listeners
	const commandFiles = await glob('./commands/**/*.js');
	if (commandFiles.length) {
		for (const file of commandFiles) {
			const command = await import(`../${file}`);
			app.command(`/${command.name}`, (...args) => command.execute(...args));
		}
		console.log('[Status] Commands loaded:', commandFiles);
	}

	// Initialize event listeners
	const eventFiles = await glob('./events/**/*.js');
	if (eventFiles.length) {
		for (const file of eventFiles) {
			const event = await import(`../${file}`);
			app.event(event.name, (...args) => event.execute(...args));
		}
		console.log('[Status] Events loaded:', eventFiles);
	}

	// Initialize views listeners
	const viewFiles = await glob('./views/**/*.js');
	if (viewFiles.length) {
		for (const file of viewFiles) {
			const view = await import(`../${file}`);
			app.view(view.name, (...args) => view.execute(...args));
		}
		console.log('[Status] Views loaded:', viewFiles);
	}

	// Register listeners for messages directed at the bot (app mentions and direct messages). These are things we want the bot to listen for, but only when the bot is specifically indicated.
	// Note: app_mentions don't work in direct messages, which is why we register both.
	const mentionFiles = await glob('./messages/mentions/**/*.js');
	if (mentionFiles.length) {
		const handleMention = async (file, ...args) => {
			const mention = await import(`../${file}`);
			const { event: { message, subtype, text } } = args[0];

			const messageText = subtype === 'message_changed' ? message.text : text;
			if (mention.hears instanceof RegExp) {
				// Listener keyword is a RegExp
				if (mention.hears.test(messageText)) {
					mention.execute(...args);
				}
			}
			else {
				// Listener keyword is a string
				const tokens = messageText.split(' ');
				if (tokens.includes(mention.hears)) {
					mention.execute(...args);
				}
			}
		};

		for (const file of mentionFiles) {
			app.event('app_mention', (...args) => handleMention(file, ...args));
			app.event('message', (...args) => {
				if (args[0].event.channel_type === 'im') {
					handleMention(file, ...args);
				}
			});
		}
		console.log('[Status] Mentions loaded:', mentionFiles);
	}

	// Initialize general message listeners. These listen for instances of words or phrases in any message sent by any user, including other bots.
	const messageFiles = await glob('./messages/**/*.js', { ignore: 'messages/mentions/**/*' });
	if (messageFiles.length) {
		for (const file of messageFiles) {
			const message = await import(`../${file}`);
			app.message(message.hears, (...args) => message.execute(...args));
		}
		console.log('[Status] Messages loaded:', messageFiles);
	}
}