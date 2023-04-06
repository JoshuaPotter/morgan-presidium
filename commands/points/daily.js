import sequelize from "../../lib/sequelize.js";
import initModels from "../../models/index.js";
const { Users } = initModels(sequelize);

export const name = "daily";

export async function execute({ ack, command, say }) {
	await ack({ 'response_type': 'in_channel' });

	try {
		const { user_id } = command;
		const user = await Users.findOne({
			where: {
				slack_id: user_id,
			},
		});

		if (user.redeemed_daily_points) {
			await say(`You already redeemed your *500 daily $TNDS*, check back tomorrow <@${user_id}> :feelsdankman:`);
		}
		else {
			await say(`<@${user_id}> redeemed *500 daily $TNDS* :pog:`);
			await Users.update({
				redeemed_daily_points: 1,
				points: user.points + 500,
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