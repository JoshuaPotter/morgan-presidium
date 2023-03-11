const { Op } = require('sequelize');
const sequelize = require('../../sequelize');
const getTagsByLoreId = require('../tags/getTagsByLoreId');
const { Lore, Tags, LoreTags } = require('../../models')(sequelize);

const getLoreByTagName = async (tagName) => {
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
			console.log('payload', payload);
			return payload;
		}
	}

	return null;
};

module.exports = getLoreByTagName;
module.exports.default = getLoreByTagName;