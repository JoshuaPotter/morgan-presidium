import addMessage from './addMessage.js';

export default async function addMessageFromAttachment(attachment, lore_id) {
	if (attachment.ts !== undefined) {
		const { from_url, original_url, ts, author_id, author_name, text } = attachment;
		const lore_url = original_url ? encodeURIComponent(original_url) : encodeURIComponent(from_url.replace(/\\/, ''));
		const author = !author_id ? author_name : author_id;
		const data = {
			lore_id,
			lore_url,
			author,
			text,
			ts,
		};
		try {
			await addMessage(data);
		}
		catch (error) {
			console.error(error);
		}
	}
	else {
		console.log(`Cannot add message without \`ts\` for ${lore_id}`);
	}
}