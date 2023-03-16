import sequelize from '../../sequelize.js';
import initModels from '../../models/index.js';
import givePoints from '../../lib/points/givePoints.js';
const { Users } = initModels(sequelize);

export const name = 'coinflip';

export async function execute({ command, ack, say }) {
	await ack({ 'response_type': 'in_channel' });

	const pointsToBet = parseInt(command.text);

	if (isNaN(pointsToBet)) {
		return await say('You can only bet using a numeric value :feelsdankman:');
	}

	if (pointsToBet <= 0) {
		return await say('You can only bet using a numeric value greater than zero :feelsdankman:');
	}

	const slack_id = command.user_id;
	const user = await Users.findOne({
		where: {
			slack_id,
		},
	});
	const userPoints = parseInt(user.points);
	if (userPoints < pointsToBet) {
		return await say("You don't have enough tendies.");
	}

	const random = Math.random();

	let msg = '';
	if (random < 0.5) {
		msg = `:chart_with_downwards_trend: <@${slack_id}> lost ${pointsToBet}... They now have ${userPoints - pointsToBet} $TNDS.`;
		await givePoints(slack_id, -pointsToBet);
	}
	else {
		msg = `:chart_with_upwards_trend: <@${slack_id}> won ${pointsToBet}! They now have ${userPoints + pointsToBet} $TNDS.`;
		await givePoints(slack_id, pointsToBet);
	}

	return await say(msg);
}