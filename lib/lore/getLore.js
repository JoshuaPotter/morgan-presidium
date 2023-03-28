import getLatestLore from './getLatestLore.js';
import getLoreById from './getLoreById.js';
import getLoreByTagName from './getLoreByTagName.js';
import getLoreByUserId from './getLoreByUserId.js';
import getRandomLore from './getRandomLore.js';

export default async function getLore(filter = '') {
	if (!filter) {
		return await getRandomLore();
	}

	const parsedNumber = parseInt(filter);
	const isId = !isNaN(parsedNumber);
	const userPattern = new RegExp(/^<@([A-Z0-9]+)|\S+>/);
	const isUserId = userPattern.test(filter);

	let lore = null;
	if (isId) {
		lore = await getLoreById(parsedNumber);
	}
	else if (isUserId) {
		const userId = filter.match(userPattern)[1];
		console.log(userId);
		lore = await getLoreByUserId(userId);
	}
	else if (filter.toLowerCase() === 'latest') {
		lore = await getLatestLore();
	}
	else {
		lore = await getLoreByTagName(filter);
	}

	return lore;
}