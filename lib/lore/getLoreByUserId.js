import sequelize from '../sequelize.js';
import getTagsByLoreId from '../tags/getTagsByLoreId.js';
import initModels from '../../models/index.js';
const { Lore, Messages } = initModels(sequelize);

export default async function getLoreByUserId(id) {
	const message = await Messages.findOne({
		attributes: [ 'lore_id' ],
		order: sequelize.random(),
		where: {
			author: id,
		},
	});

	if (message !== null) {
		const lore = await Lore.findOne({
			where: {
				lore_id: message.lore_id,
			},
		});

		if (lore !== null) {
			const tags = await getTagsByLoreId(lore.lore_id);
			const payload = {
				...lore.dataValues,
				tags: tags.length ? tags.map(record => record.tag_title) : tags,
			};
			return payload;
		}
	}

	return null;
}