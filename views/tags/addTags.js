import addTags from '../../lib/tags/addTags.js';

export const name = 'addTags';

export async function execute({ ack, body, client, view }) {
	await ack();

	// Handle add tags modal view submission
	const user = body.user.id;
	const { private_metadata, state } = view;
	const addTagsInput = state.values.addTagsBlock.addTagsInput;
	const { channel, lore_id } = JSON.parse(private_metadata);

	const tags = addTagsInput.value.split(',').map(tag => tag.trim());
	const addedTags = await addTags(lore_id, tags);

	let msg = '';
	if (addedTags) {
		msg = `I added the tag${tags.length === 1 ? '' : 's'} *${tags.join('*, *')}* to #*${lore_id}* :yep:`;
	}
	else {
		msg = `I couldn't add the tag${tags.length === 1 ? '' : 's'} *${tags.join('*, *')}* to #*${lore_id}* :pepehands:`;
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