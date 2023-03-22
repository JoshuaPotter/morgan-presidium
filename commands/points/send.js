import sequelize from '../../sequelize.js';
import initModels from '../../models/index.js';
import incrementPoints from '../../lib/points/incrementPoints.js';
import decrementPoints from '../../lib/points/decerementPoints.js';
const { Users } = initModels(sequelize);

export const name = 'send';

export async function execute({ client, command, ack, say }) {
	await ack({ 'response_type': 'in_channel' });

	const slack_id = command.user_id;
	const helpMsg = `<@${command.user_id}> To use this command, only send a tagged user and a number of tendies to send. Example: \`/send @username 10\``;

	if (!command.text) {
		return await say(helpMsg);
	}

	let recipient = '';
	let amount = '';
	const tokens = command.text.split(' ');
	if (tokens.length !== 2) {
		return await say(helpMsg);
	}

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
			amount = parseInt(parsedToken);
		}
	}

	if (!recipient) {
		return await say(`<@${slack_id}> Not a valid recipient :feelsdankman:`);
	}

	if (recipient === slack_id) {
		return await say(`<@${slack_id}> You can't send tendies to yourself :feelsdankman:`);
	}

	if (!amount || isNaN(amount)) {
		return await say(`<@${slack_id}> You must include an amount of tendies to send :feelsdankman:`);
	}

	if (amount <= 0) {
		return await say(`<@${slack_id}> You must send more than one tender :feelsdankman:`);
	}

	try {
		const user = await Users.findOne({
			where: {
				slack_id,
			},
		});
		const userPoints = parseInt(user.points);
		if (userPoints < amount) {
			return await say(`<@${slack_id}> You don't have enough tendies to send.`);
		}

		await decrementPoints(slack_id, amount);
		await incrementPoints(recipient, amount);

		await client.chat.postMessage({
			channel: recipient,
			text: `<@${slack_id}> sent you *${amount} $TNDS* :peepohappy:`,
		});
		return await say(`Transferred *${amount} $TNDS* to <@${recipient}> :sparkles:`);
	}
	catch (error) {
		console.error(error);
	}
	return await say('I couldn\'t process this transfer.');
}