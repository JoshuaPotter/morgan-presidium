import sequelize from '../../lib/sequelize.js';
import initModels from '../../models/index.js';
const { Users } = initModels(sequelize);

export const name = 'balance';

export async function execute({ ack, command, client, say }) {
	await ack({ response_type: 'in_channel' });

	const { text, user_id } = command;

	try {
		// Determine whether we lookup rank of command invoker or a different user
		let slack_id = user_id;
		let foundUser = null;
		if (text) {
			slack_id = text.slice(text.indexOf('@') + 1, text.indexOf('|'));

			foundUser = await client.users.info({ user: slack_id });
			if (!foundUser.ok) {
				return await say('I couldn\'t find that user.');
			}
		}
		const user = await Users.findOne({
			where: {
				slack_id,
			},
		});

		if (user === null) {
			return await say('I couldn\'t find an available balance.');
		}

		return await say(`<@${command.user_id}> ${slack_id !== command.user_id ? `${foundUser.user.profile.display_name} ` : '' }has an available balance of *${user.points} $TNDS*`);
	}
	catch (error) {
		console.error(error);
	}
}