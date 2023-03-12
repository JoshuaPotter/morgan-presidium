import getLoreById from '../lib/lore/getLoreById.js';
import getLoreByTagName from '../lib/lore/getLoreByTagName.js';
import getRandomLore from '../lib/lore/getRandomLore.js';

const getLore = async (filter = '') => {
	const parsedNumber = parseInt(filter);

	let lore = null;
	if (filter && !isNaN(parsedNumber)) {
		lore = await getLoreById(parsedNumber);
	}
	else if (filter && isNaN(parsedNumber)) {
		lore = await getLoreByTagName(filter);
	}
	else {
		lore = await getRandomLore();
	}
	return lore;
};

// Command name
export const name = "quote";

// Command action
export async function execute({ command, ack, say }) {
	// Acknowledge command request
	await ack();

	const lore = await getLore(command.text);
	if (lore === null) {
		await say('No lore found :feelsdankman:');
	}
	else {
		const { lore_url, lore_id, tags } = lore;
		await say(`*#${lore_id}* ${decodeURIComponent(lore_url)}`);
		if (tags.length) {
			await say(`Tags: ${tags.join(', ')}`);
		}
	}
};
