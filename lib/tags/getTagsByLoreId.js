const { Op } = require('sequelize');
const sequelize = require('../../sequelize');
const { Tags, LoreTags } = require('../../models')(sequelize);

const getTagsByLoreId = async (loreId) => {
	// Get tag ids associated with this lore record's id
	const loreTags = await LoreTags.findAll({
		where: {
			lore_id: loreId,
		},
	});
	if (loreTags.length) {
		// Get tags by list of tag id's associated with the lore record
		const tagIds = loreTags.map(loreTag => loreTag.tag_id);
		console.log('tagIds', tagIds);
		return Tags.findAll({
			where: {
				tag_id: {
					[Op.in]: tagIds,
				},
			},
		});
	}
	return null;
};

module.exports = getTagsByLoreId;
module.exports.default = getTagsByLoreId;