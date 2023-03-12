import getLoreById from '../lib/lore/getLoreById.js';
import getLoreByTagName from '../lib/lore/getLoreByTagName.js';
import getRandomLore from '../lib/lore/getRandomLore.js';

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