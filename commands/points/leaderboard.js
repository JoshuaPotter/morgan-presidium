import sequelize from '../../sequelize.js';
import initModels from '../../models/index.js';
const { Users } = initModels(sequelize);

export const name = 'leaderboard';

export async function execute({ ack, say }) {
	await ack({ response_type: 'in_channel' });

	try {
		const users = await Users.findAll({
			order: [['points', 'DESC']],
		});
		const formattedUsers = await Promise.all(users.map(async (user, index) => {
			return `*#${index + 1}*. <@${user.slack_id}> — ${user.points} $TNDS`;
		}));

		return await say(`:technologist: :chart_with_upwards_trend: Users with the most tenders :tendie:\n\n${formattedUsers.join('\n')}`);
	}
	catch (error) {
		console.error(error);
	}

	return await say('I couldn\'t get the leaderboard.');
}