import sequelize from '../sequelize.js';
import initModels from '../../models/index.js';
const { Tags, LoreTags } = initModels(sequelize);

export default async function getTagsByLoreId(loreId) {
	// Get tag ids for tags associated with this lore record
	const loreTags = await LoreTags.findAll({
		attributes: ['tag_id'],
		where: {
			lore_id: loreId,
		},
	});

	if (loreTags.length) {
		// Get tags names
		const tagIds = loreTags.map(loreTag => loreTag.tag_id);
		return Tags.findAll({
			attributes: ['tag_title'],
			where: {
				tag_id: tagIds,
			},
		});
	}

	return [];
}