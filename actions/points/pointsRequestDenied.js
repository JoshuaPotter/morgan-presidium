export const name = 'pointsRequestDenied';

export async function execute({ ack, body, client }) {
	await ack();

	if (!Object.keys(body.message.metadata).length) {
		console.error('Missing message metadata object.');
		return false;
	}

	const { event_payload, event_type } = body.message.metadata;
	if (event_type === 'pointsRequest') {
		const { amount, sendTo, sendFrom } = event_payload;

		try {
			// Update initial request prompt
			await client.chat.update({
				channel: body.channel.id,
				as_user: true,
				ts: body.message.ts,
				text: `You denied <@${sendTo}>'s request for *${amount} $TNDS* :notlikethis:`,
				blocks: [
					{
						type: 'section',
						text: {
							type: 'mrkdwn',
							text: `You denied <@${sendTo}>'s request for *${amount} $TNDS* :notlikethis:`,
						},
					},
				],
			});

			// Send alert to recipient
			await client.chat.postMessage({
				channel: sendTo,
				text: `<@${sendFrom}> denied your request for *${amount} $TNDS* :notlikethis:`,
			});
		}
		catch (error) {
			console.error(error);
		}
	}
}