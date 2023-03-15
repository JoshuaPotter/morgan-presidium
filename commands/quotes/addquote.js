import addLore from '../../lib/lore/addLore.js';
import isSlackLink from '../../lib/misc/isSlackLink.js';

export const name = 'addquote';

// Command action
export async function execute({ command, ack, say }) {
	// Acknowledge command request
	await ack({ 'response_type': 'in_channel' });

	if (isSlackLink(command.text)) {
		try {
			const obj = {
				lore_url: command.text,
				submitted_by: command.user_id,
			};
			const lore = await addLore(obj);

			if (lore !== null) {
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
	else {
		return await say('I\'m not sure what you just sent me, make sure you only send me slack message permalinks :feelsdankman:');
	}
}