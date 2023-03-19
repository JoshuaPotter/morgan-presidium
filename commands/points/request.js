export const name = 'request';

export async function execute({ ack, client, command, say }) {
	await ack({ response_type: 'in_channel' });

	const slack_id = command.user_id;
	const helpMsg = `<@${command.user_id}> To use this command, only send a tagged user and a number of tendies to request. Example: \`/request @username 10\``;

	if (!command.text) {
		return await say(helpMsg);
	}

	let targetUser = '';
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
					targetUser = user;
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

	if (!targetUser) {
		return await say(`<@${slack_id}> You must include a user to request tendies from :feelsdankman:`);
	}

	if (!targetUser === slack_id) {
		return await say(`<@${slack_id}> You can't request tendies from yourself :feelsdankman:`);
	}

	if (!amount || isNaN(amount)) {
		return await say(`<@${slack_id}> You must include an amount of tendies to request :feelsdankman:`);
	}

	if (amount <= 0) {
		return await say(`<@${slack_id}> You must request more than one tender :feelsdankman:`);
	}

	// Send view to target user in DM to request points transfer
	try {
		await client.chat.postMessage({
			channel: targetUser,
			text: `<@${slack_id}> requested *${amount} $TNDS*`,
			metadata: {
				event_type: 'pointsRequest',
				event_payload: {
					amount,
					sendTo: slack_id,
					sendFrom: targetUser,
				},
			},
			blocks: [
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: `<@${slack_id}> requested *${amount} $TNDS*`,
					},
				},
				{
					type: 'divider',
				},
				{
					type: 'context',
					elements: [
						{
							type: 'mrkdwn',
							text: 'Send $TNDS',
						},
						{
							type: 'mrkdwn',
							text: `*Amount:* ${amount} $TNDS`,
						},
						{
							type: 'mrkdwn',
							text: `*To:* <@${slack_id}>`,
						},
					],
				},
				{
					type: 'actions',
					elements: [
						{
							type: 'button',
							style: 'primary',
							action_id: 'pointsRequestAccepted',
							text: {
								type: 'plain_text',
								text: 'Accept',
								emoji: true,
							},
							confirm: {
								title: {
									type: 'plain_text',
									text: 'Are you sure?',
								},
								text: {
									type: 'plain_text',
									text: `Are you sure you want to send ${amount} $TNDS to ${command.user_name}?`,
								},
								confirm: {
									type: 'plain_text',
									text: 'Yes',
								},
								deny: {
									type: 'plain_text',
									text: 'Cancel',
								},
							},
						},
						{
							type: 'button',
							style: 'danger',
							action_id: 'pointsRequestDenied',
							text: {
								type: 'plain_text',
								text: 'Deny',
								emoji: true,
							},
						},
					],
				},
			],
		});

		return say(`Sent a request to <@${targetUser}> for *${amount} $TNDS* :peepoleave:`);
	}
	catch (error) {
		console.error(error);
	}

	return say('I couldn\'t process this request.');
}