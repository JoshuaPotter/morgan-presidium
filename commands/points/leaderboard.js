import sequelize from '../../lib/sequelize.js';
import initModels from '../../models/index.js';
const { Users } = initModels(sequelize);

export const name = 'leaderboard';

export async function execute({ ack, client, command, say }) {
	await ack({ response_type: 'in_channel' });

	try {
		const options = {
			order: [['points', 'DESC']],
		};
		if (command.text !== 'all') {
			options.limit = 5;
		}
		const users = await Users.findAll(options);
		const formattedUsers = await Promise.all(users.map(async (user, index) => {
			const { user: { profile } } = await client.users.info({ user: user.slack_id });
			return `*#${index + 1}*. ${profile.display_name} — ${user.points} $TNDS`;
		}));

		return await say(`:technologist: :chart_with_upwards_trend: Top 5 users by $TNDS :tendie:\n\n${formattedUsers.join('\n')}`);
	}
	catch (error) {
		console.error(error);
	}

	return await say('I couldn\'t get the leaderboard.');
}