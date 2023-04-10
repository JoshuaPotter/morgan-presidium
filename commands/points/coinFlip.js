import sequelize from '../../lib/sequelize.js';
import initModels from '../../models/index.js';
import incrementPoints from '../../lib/points/incrementPoints.js';
import decrementPoints from '../../lib/points/decerementPoints.js';
const { Users } = initModels(sequelize);

export const name = 'coinflip';

export async function execute({ command, ack, say }) {
	await ack({ 'response_type': 'in_channel' });

	const pointsToBet = parseInt(command.text);

	if (isNaN(pointsToBet)) {
		return await say(`<@${command.user_id}> You can only bet using a numeric value :feelsdankman:`);
	}

	if (pointsToBet <= 0) {
		return await say(`<@${command.user_id}> You can only bet using a numeric value greater than zero :feelsdankman:`);
	}

	try {
		const slack_id = command.user_id;
		const user = await Users.findOne({
			where: {
				slack_id,
			},
		});
		const userPoints = parseInt(user.points);
		if (userPoints < pointsToBet) {
			return await say(`<@${command.user_id}> You don't have enough tendies.`);
		}

		const random = Math.random();

		let msg = '';
		if (random < 0.5) {
			msg = `:chart_with_downwards_trend: <@${slack_id}> lost ${pointsToBet}... They now have ${userPoints - pointsToBet} $TNDS.`;
			await decrementPoints(slack_id, pointsToBet);
		}
		else {
			msg = `:chart_with_upwards_trend: <@${slack_id}> won *${pointsToBet}*! They now have a balance of *${userPoints + pointsToBet} $TNDS*.`;
			await incrementPoints(slack_id, pointsToBet);
		}

		return await say(msg);
	}
	catch (error) {
		console.error(error);
	}

	return await say('I couldn\'t process this coin flip');
}