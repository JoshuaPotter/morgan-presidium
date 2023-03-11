const sequelize = require('../sequelize');
const { Quotes } = require('../models')(sequelize);

module.exports = {
	name: 'quote',
	async execute({ command, ack, say }) {
		// Acknowledge command request
		await ack();

		const quote = await Quotes.findOne();
		if(quote === null) {
			await say('none found');
		}
		else {
			const { dataValues: { lore_url, lore_id } } = quote;
			await say(`*${lore_id}* - ${decodeURIComponent(lore_url)}`);
		}
	},
};