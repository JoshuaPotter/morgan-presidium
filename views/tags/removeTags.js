import removeTags from '../../lib/tags/removeTags.js';

export const name = 'removeTags';

export async function execute({ ack, body, client, view }) {
	await ack();

	// Handle remove tags modal view submission
	const user = body.user.id;
	const { private_metadata, state } = view;
	const removeTagsInput = state['values']['removeTagsBlock']['removeTagsInput'];
	const { channel, lore_id } = JSON.parse(private_metadata);

	const tags = removeTagsInput.value.split(',').map(tag => tag.trim());
	const removedTags = await removeTags(lore_id, tags);

	let msg = '';
	if (removedTags) {
		msg = `I removed the tag${tags.length === 1 ? '' : 's'} *${tags.join('*, *')}* from #*${lore_id}* :yep:`;
	}
	else {
		msg = `I couldn't remove the tag${tags.length === 1 ? '' : 's'} *${tags.join('*, *')}* from #*${lore_id}* :pepehands:`;
	}

	try {
		await client.chat.postMessage({
			channel: channel,
			text: `<@${user}> ${msg}`,
		});
	}
	catch (error) {
		console.error(error);
	}
}