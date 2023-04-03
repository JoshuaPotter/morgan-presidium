// TODO: Run once to fix pre-existing links that won't unfurl with a string channel name. Remove once done on prod.

import sequelize from './lib/sequelize.js';
import initModels from './models/index.js';
const { Lore } = initModels(sequelize);

async function updateLoreItem(item) {
	const { lore_id, lore_url } = item;
	console.log(lore_id);
	const decodedLoreURL = decodeURIComponent(lore_url);
	const newURL = decodedLoreURL.replace(/\barchives[-a-z0-9+&@#/%?=~_|!:,.;]*[-a-z0-9+&@#/%=~_|]\//g, 'archives/C0NH03G4D/');
	await Lore.update({
		lore_url: encodeURIComponent(newURL),
	}, {
		where: {
			lore_id,
		},
	});
}

(async () => {
	const loreItems = await Lore.findAll();

	for (const item of loreItems) {
		await updateLoreItem(item);
	}
})();