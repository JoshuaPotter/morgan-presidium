import sequelize from '../../lib/sequelize.js';
import initModels from '../../models/index.js';
import incrementPoints from '../../lib/points/incrementPoints.js';
import decrementPoints from '../../lib/points/decerementPoints.js';
const { Users } = initModels(sequelize);

export const name = 'rolldice';

export async function execute({ command, ack, say }) {
	await ack({ 'response_type': 'in_channel' });
	
	let [diceRollTarget, pointsToBet] = command.text.split(' ');
	pointsToBet = parseInt(pointsToBet);

	if (!diceRollTarget) {
		return await say(`<@${command.user_id}> You must choose a dice roll target number between 1 and 6.`);
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

		// Rolls a random number between 1 and 6
		const diceRoll = Math.floor(Math.random() * 6) + 1;

		let msg = '';
		const userIsBettingTendies = Boolean(pointsToBet);
		const userWonDiceRoll = diceRoll === diceRollTarget;
		if (userWonDiceRoll && userIsBettingTendies) {
			msg = `:chart_with_upwards_trend: <@${slack_id}> rolled ${diceRoll} and won ${pointsToBet}! They now have ${userPoints + pointsToBet} $TNDS.`;
			await incrementPoints(slack_id, pointsToBet);
		} else if (!userWonDiceRoll && userIsBettingTendies) {
			msg = `:chart_with_downwards_trend: <@${slack_id}> rolled ${diceRoll} and lost ${pointsToBet}... They now have ${userPoints - pointsToBet} $TNDS.`;
			await decrementPoints(slack_id, pointsToBet);
		} else if (userWonDiceRoll) {
			msg = `:chart_with_upwards_trend: <@${slack_id}> rolled ${diceRoll} and won!`;
		} else {
			msg = `:chart_with_downwards_trend: <@${slack_id}> rolled ${diceRoll} and lost...`;
		}

		return await say(msg);
	}
	catch (error) {
		console.error(error);
	}

	return await say('I couldn\'t process this dice roll');
}