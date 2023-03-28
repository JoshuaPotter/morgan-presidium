import addMessageFromAttachment from '../lib/messages/addMessageFromAttachment.js';
import isSlackLink from '../lib/misc/isSlackLink.js';

export const name = 'message';

// Ingest a Lore messsage post by the bot
export async function execute({ event }) {
	// Message has attachments, let's check if they are slack links posted by the bot
	if (event?.message?.attachments && event.channel_type === 'im') {
		const eventText = event.message.text;
		const attachments = event.message.attachments;

		// Check if message starts with the formatting of a bot quote message
		const regex = new RegExp(/\*#(\d+)\*/);
		const hasId = regex.test(eventText);
		if (hasId) {
			const id = eventText.match(regex)[1].replaceAll('*', '');
			// Remove ID from message text and check if remaining tokens in message are valid slack permalinks
			const tokens = eventText.split(' ');
			tokens.shift();
			const links = tokens.join(' ');

			if (isSlackLink(links)) {
				attachments.forEach(async attachment => {
					await addMessageFromAttachment(attachment, id);
				});
			}
		}
	}
}