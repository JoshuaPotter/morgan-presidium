import addLore from '../../lib/lore/addLore.js';
import getTimestampFromSlackURL from '../../lib/misc/getTimestampFromSlackURL.js';
import addMessage from '../../lib/messages/addMessage.js';
import isSlackLink from '../../lib/misc/isSlackLink.js';

export const name = 'addquote';

// Command action
export async function execute({ client, command, ack, say }) {
	// Acknowledge command request
	await ack({ 'response_type': 'in_channel' });

	// Bail early if this is a direct message
	const channelInfo = await client.conversations.info({
		channel: command.channel_id,
	});
	if (channelInfo.ok) {
		const { channel: { is_im, is_private, is_mpim, is_group } } = channelInfo;
		const isPrivate = is_im || is_private || is_mpim || is_group;
		if (isPrivate) {
			return await say('I can\'t add lore from private channels :feelsdankman:');
		}
	}
	else {
		return await say('I can\'t look up the channel info to determine if this lore is from a public channel :caution:');
	}

	if (!isSlackLink(command.text)) {
		return await say('I\'m not sure what you just sent me, make sure you only send me slack message permalinks :feelsdankman:');
	}

	try {
		const lore = await addLore({
			lore_url: command.text,
			submitted_by: command.user_id,
		});

		if (lore !== null) {
			// Add each message to the database. Look up the message in conversation history by using the timestamp at the end of each slack message URL submitted.
			const links = command.text.split(' ');
			for (const link of links) {
				const url = link.replaceAll(new RegExp(/[<>]/g));
				const ts = getTimestampFromSlackURL(url);
				const result = await client.conversations.history({
					channel: command.channel_id,
					latest: ts,
					inclusive: true,
					limit: 1,
				});

				// There should only be one result (stored in the zeroth index)
				if (result.ok) {
					const { text, user } = result.messages[0];
					await addMessage({
						lore_id: lore.lore_id,
						lore_url: link,
						author: user,
						text,
						ts,
					});
				}
			}

			const possibleResponses = [
				`I'm gonna add this as *#${lore.lore_id} :lebronjam:*`,
				`Added to the LIST as *#${lore.lore_id}* :vibepls:`,
				`added *#${lore.lore_id}* :deadass:`,
			];
			const index = Math.floor(Math.random() * possibleResponses.length);
			return await say(possibleResponses[index]);
		}
		else {
			return await say('I couldn\'t add the lore (database error) :pepehands:');
		}
	}
	catch (error) {
		console.log(error);
	}
}