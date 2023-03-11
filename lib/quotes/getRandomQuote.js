const sequelize = require('../../sequelize');
const { Quotes } = require('../../models')(sequelize);

const getRandomQuote = async () => {
	return Quotes.findOne({
		order: sequelize.random(),
	});
};

module.exports = getRandomQuote;
module.exports.default = getRandomQuote;