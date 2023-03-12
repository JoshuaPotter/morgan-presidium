import getLoreById from './getLoreById.js';
import getLoreByTagName from './getLoreByTagName.js';
import getRandomLore from './getRandomLore.js';

export default async function getLore(filter = "") {
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