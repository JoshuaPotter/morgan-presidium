import getAllTags from '../../lib/tags/getAllTags.js';

export const name = 'tags';

// Command action
export async function execute({ ack, say }) {
	// Acknowledge command request
	await ack({ 'response_type': 'in_channel' });

	try {
		const message = await say('See thread for tags.');
		const tags = await getAllTags();
		const tagKeys = Object.keys(tags);
		for (const key of tagKeys) {
			// A crude way of throttling the API calls to slack to attempt rate limit reduction.
			await new Promise(resolve => {
				return setTimeout(async () => {
					await say({ text: `*Letter:* ${key}\n\`${tags[key].join('` `')}\``, thread_ts: message.ts });
					resolve();
				}, 100);
			});
		}
	}
	catch (error) {
		console.error(error);
	}

	return await say('I couldn\' get the tags.');
}