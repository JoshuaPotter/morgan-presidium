const getLoreById = require('../lib/lore/getLoreById');
const getLoreByTagName = require('../lib/lore/getLoreByTagName');
const getRandomLore = require('../lib/lore/getRandomLore');

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

module.exports = {
	name: 'quote',
	async execute({ command, ack, say }) {
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
	},
};