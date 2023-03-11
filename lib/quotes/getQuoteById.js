const { Op } = require('sequelize');
const sequelize = require('../../sequelize');
const { Quotes } = require('../../models')(sequelize);

const getQuoteById = async (id) => {
	return Quotes.findOne({
		where: {
			lore_id: {
				[Op.eq]: id,
			},
		},
	});
};

module.exports = getQuoteById;
module.exports.default = getQuoteById;