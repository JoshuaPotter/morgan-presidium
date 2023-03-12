import sequelize from '../../sequelize.js';
import getTagsByLoreId from '../tags/getTagsByLoreId.js';
import initModels from '../../models/index.js';
const { Lore, Tags, LoreTags } = initModels(sequelize);

export default async function getLoreByTagName(tagName) {
	// Get the tag id
	const tag = await Tags.findOne({
		where: {
			tag_title: tagName,
		},
	});

	if (tag !== null) {
		// Get random lore record with the tag
		const loreWithTag = await LoreTags.findOne({
			where: {
				tag_id: tag.tag_id,
			},
			order: sequelize.random(),
		});

		if (loreWithTag !== null) {
			// Get quote by id
			const lore = await Lore.findOne({
				where: {
					lore_id: loreWithTag.lore_id,
				},
			});
			const tags = await getTagsByLoreId(lore.lore_id);
			const payload = {
				...lore.dataValues,
				tags: tags.length ? tags.map(record => record.tag_title) : tags,
			};
			return payload;
		}
	}

	return null;
};