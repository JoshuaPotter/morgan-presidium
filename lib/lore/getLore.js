import getLatestLore from './getLatestLore.js';
import getLoreById from './getLoreById.js';
import getLoreByTagName from './getLoreByTagName.js';
import getRandomLore from './getRandomLore.js';

export default async function getLore(filter = "") {
	const parsedNumber = parseInt(filter);
	const isTag = isNaN(parsedNumber);
	let lore = null;
	if (filter && !isTag) {
		lore = await getLoreById(parsedNumber);
	}
	else if (filter && isTag && filter.toLowerCase() === 'latest') {
		lore = await getLatestLore();
	}
	else if (filter && isTag) {
		lore = await getLoreByTagName(filter);
	}
	else {
		lore = await getRandomLore();
	}
	return lore;
};