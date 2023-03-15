import sequelize from '../../sequelize.js';
import getTagsByLoreId from '../tags/getTagsByLoreId.js';
import initModels from '../../models/index.js';
const { Lore } = initModels(sequelize);

export default async function getRandomLore() {
	const lore = await Lore.findOne({
		order: sequelize.random(),
	});

	if (lore !== null) {
		const tags = await getTagsByLoreId(lore.lore_id);
		const payload = {
			...lore.dataValues,
			tags: tags.length ? tags.map(record => record.tag_title) : tags,
		};
		return payload;
	}

	return null;
}