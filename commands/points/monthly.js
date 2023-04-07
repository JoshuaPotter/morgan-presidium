import sequelize from '../../lib/sequelize.js';
import initModels from '../../models/index.js';
const { Users } = initModels(sequelize);

export const name = 'monthly';

export async function execute({ ack, command, say }) {
	await ack({ 'response_type': 'in_channel' });

	try {
		const { user_id } = command;
		const user = await Users.findOne({
			where: {
				slack_id: user_id,
			},
		});

		if (user.redeemed_monthly_points) {
			await say(`You already redeemed your *7500 monthly $TNDS*, check back next month <@${user_id}> :feelsdankman:`);
		}
		else {
			await say(`<@${user_id}> redeemed *7500 monthly $TNDS* :pog:`);
			await Users.update({
				redeemed_monthly_points: 1,
				points: user.points + 7500,
			}, {
				where: {
					slack_id: user_id,
				},
			});
		}
	}
	catch (error) {
		console.error(error);
	}
}