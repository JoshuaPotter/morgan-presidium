const { Op } = require('sequelize');
const sequelize = require('../../sequelize');
const { Quotes, Tags, LoreTags } = require('../../models')(sequelize);

const getQuoteByTag = async (tagName) => {
	// Get the tag id
	const tag = await Tags.findOne({
		where: {
			tag_title: tagName,
		},
	});

	if (tag !== null) {
		// Get random quote with this tag
		const taggedQuote = await LoreTags.findOne({
			where: {
				tag_id: tag.tag_id,
			},
			order: sequelize.random(),
		});

		if (taggedQuote !== null) {
			// Get quote by id
			return Quotes.findOne({
				where: {
					lore_id: {
						[Op.eq]: taggedQuote.lore_id,
					},
				},
			});
		}
	}

	return null;
};

module.exports = getQuoteByTag;
module.exports.default = getQuoteByTag;