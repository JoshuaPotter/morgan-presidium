const { Op } = require('sequelize');
const sequelize = require('../../sequelize');
const getTagsByLoreId = require('../tags/getTagsByLoreId');
const { Lore } = require('../../models')(sequelize);

const getLoreById = async (id) => {
	const lore = await Lore.findOne({
		where: {
			lore_id: id,
		},
	});
	const tags = await getTagsByLoreId(lore.lore_id);
	const payload = {
		...lore.dataValues,
		tags: tags.length ? tags.map(tag => tag.tag_title) : tags,
	};
	console.log('payload', payload);
	return payload;
};

module.exports = getLoreById;
module.exports.default = getLoreById;