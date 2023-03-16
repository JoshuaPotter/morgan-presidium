import sequelize from '../../sequelize.js';
import initModels from '../../models/index.js';
import incrementPoints from '../../lib/points/incrementPoints.js';
import { parse } from 'path';
const { Users } = initModels(sequelize);

export const name = 'send';

export async function execute({ client, command, ack, say }) {
	await ack({ 'response_type': 'in_channel' });

	if (!command.text) {
		return await say(`<@${command.user_id}> To use this command, only send a tagged user and a number of tendies to send. Example: \`/command @username 10\``);
	}


	let recipient = '';
	let pointsToSend = '';
	const tokens = command.text.split(' ');
	for (const token of tokens) {
		const parsedToken = parseInt(token);
		if (isNaN(parsedToken)) {
			// Found user ID, verify identity exists...
			try {
				const user = token.slice(token.indexOf('@') + 1, token.indexOf('|'));
				const foundUser = await client.users.info({ user });
				if (foundUser.ok) {
					recipient = user;
				}
			}
			catch (error) {
				console.error(error);
			}
		}
		else {
			// Found points to send
			pointsToSend = parseInt(parsedToken);
		}
	}

	if (!recipient) {
		return await say(`<@${command.user_id}> Not a valid recipient :feelsdankman:`);
	}

	if (!pointsToSend || isNaN(pointsToSend)) {
		return await say(`<@${command.user_id}> You must include an amount of tendies to send :feelsdankman:`);
	}

	if (pointsToSend <= 0) {
		return await say(`<@${command.user_id}> You must send more than one tender :feelsdankman:`);
	}

	const slack_id = command.user_id;
	const user = await Users.findOne({
		where: {
			slack_id,
		},
	});
	const userPoints = parseInt(user.points);
	if (userPoints < pointsToSend) {
		return await say(`<@${command.user_id}> You don't have enough tendies to send.`);
	}

	return await say(`<@${command.user_id}> sent ${pointsToSend} $TNDS to <@${recipient}>`);
}