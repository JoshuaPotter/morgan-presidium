import sequelize from '../../sequelize.js';
import initModels from '../../models/index.js';
const { Users } = initModels(sequelize);

export const name = 'rank';

export async function execute({ ack, client, command, say }) {
	await ack({ response_type: 'in_channel' });

	const { text, user_id } = command;

	try {
		// Determine whether we lookup rank of command invoker or a different user
		let slack_id = user_id;
		if (text) {
			slack_id = text.slice(text.indexOf('@') + 1, text.indexOf('|'));

			const foundUser = await client.users.info({ user: slack_id });
			if (!foundUser.ok) {
				return await say('I couldn\'t find that user.');
			}
		}

		const users = await Users.findAll({
			order: [['points', 'DESC']],
		});
		let userIndex = 0;
		let userRecord = {};
		users.forEach((user, index) => {
			if (user.slack_id === slack_id) {
				userIndex = index;
				userRecord = user;
			}
		});

		return await say(`Rank *#${userIndex + 1}* of *${users.length}* — ${userRecord.points} $TNDS`);
	}
	catch (error) {
		console.error(error);
	}

	return await say('I couldn\'t get user ranks.');
}