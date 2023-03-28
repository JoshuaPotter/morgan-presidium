import sequelize from '../../lib/sequelize.js';
import initModels from '../../models/index.js';
const { Lore, Users } = initModels(sequelize);

// Bot listens for these keywords
const keywords = ['stats', 'statistics', 'count', 'how many quotes'];
// Bot hears one of the keywords in a message
export const hears = new RegExp(`.*(${keywords.join('|')}).*`);

// Event action
export async function execute({ say }) {
	try {
		const loreCount = await Lore.count();
		const pointsSum = await Users.sum('points');
		//     await bot.reply(message, `I see *${count}* quotes. Also, if you're interested in some other stats: I joined YetiChat on April 26, 2016 and in 2021 I migrated to version 2.0. Soon I will be unstoppable.`);
		//     await bot.reply(message, "There's no quotes in the database. Try adding some and I can provide some stats about them.");
		if (loreCount > 0) {
			return await say(`I'm tracking *${loreCount}* quotes and a total of *${pointsSum}* points across all users. Also, if you're interested in some other stats: I joined YetiChat on April 26, 2016 as version 2.0 and in 2021 I migrated to version 3.0. In January 2023, development on version 4.0 began on my code base.`);
		}
		else {
			return await say('There\'s no quotes in the database. Try adding some and I can provide some stats about them.');
		}
	}
	catch (error) {
		console.error(error);
	}

	await say('I couldn\'t retrieve stats.');
}