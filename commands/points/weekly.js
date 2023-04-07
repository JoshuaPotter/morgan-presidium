import sequelize from '../../lib/sequelize.js';
import initModels from '../../models/index.js';
const { Users } = initModels(sequelize);

export const name = 'weekly';

export async function execute({ ack, command, say }) {
	await ack({ 'response_type': 'in_channel' });

	try {
		const { user_id } = command;
		const user = await Users.findOne({
			where: {
				slack_id: user_id,
			},
		});

		if (user.redeemed_weekly_points) {
			await say(`You already redeemed your *2500 weekly $TNDS*, check back next week <@${user_id}> :feelsdankman:`);
		}
		else {
			await say(`<@${user_id}> redeemed *2500 weekly $TNDS* :pog:`);
			await Users.update({
				redeemed_weekly_points: 1,
				points: user.points + 2500,
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