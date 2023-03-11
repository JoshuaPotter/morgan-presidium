const sequelize = require('../../sequelize');
const getTagsByLoreId = require('../tags/getTagsByLoreId');
const { Lore } = require('../../models')(sequelize);

const getRandomLore = async () => {
	const lore = await Lore.findOne({
		order: sequelize.random(),
	});
	const tags = await getTagsByLoreId(lore.lore_id);
	const payload = {
		...lore.dataValues,
		tags: tags === null ? [] : tags.map(tag => tag.tag_title),
	};
	console.log('payload', payload);
	return payload;
};

module.exports = getRandomLore;
module.exports.default = getRandomLore;