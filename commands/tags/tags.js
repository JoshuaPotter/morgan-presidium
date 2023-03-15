import getAllTags from '../../lib/tags/getAllTags.js';

export const name = 'tags';

// Command action
export async function execute({ ack, say }) {
	// Acknowledge command request
	await ack({ 'response_type': 'in_channel' });

	const message = await say('See thread for tags.');

	const tags = await getAllTags();
	const tagKeys = Object.keys(tags);
	tagKeys.forEach(async key => {
		await say({ text: `*Letter:* ${key}\n\`${tags[key].join('` `')}\``, thread_ts: message.ts });
	});
}