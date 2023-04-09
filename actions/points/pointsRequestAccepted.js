import decrementPoints from '../../lib/points/decerementPoints.js';
import getUserPoints from '../../lib/points/getUserPoints.js';
import incrementPoints from '../../lib/points/incrementPoints.js';

export const name = 'pointsRequestAccepted';

export async function execute({ ack, body, client }) {
	await ack();

	if (!Object.keys(body.message.metadata).length) {
		console.error('Missing message metadata object.');
		return false;
	}

	const { event_payload, event_type } = body.message.metadata;
	if (event_type === 'pointsRequest') {
		const { amount, sendTo, sendFrom } = event_payload;

		// Check if there is an available balance before accepting
		const availablePoints = await getUserPoints(sendFrom);
		if (availablePoints < amount) {
			return await client.chat.postMessage({
				channel: sendFrom,
				text: `You don't have enough points to accept <@${sendTo}>'s request.`,
			});
		}

		await incrementPoints(sendTo, amount);
		await decrementPoints(sendFrom, amount);

		try {
			// Update initial request prompt
			await client.chat.update({
				channel: body.channel.id,
				as_user: true,
				ts: body.message.ts,
				text: `You accepted <@${sendTo}>'s request for *${amount} $TNDS* :peepohappy:`,
				blocks: [
					{
						type: 'section',
						text: {
							type: 'mrkdwn',
							text: `<@${sendTo}> requested *${amount} $TNDS*`,
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
								text: `*To:* <@${sendTo}>`,
							},
						],
					},
					{
						type: 'section',
						text: {
							type: 'mrkdwn',
							text: `✅ *You accepted <@${sendTo}>'s request for ${amount} $TNDS* :peepohappy:`,
						},
					},
				],
			});

			// Send alert to recipient
			await client.chat.postMessage({
				channel: sendTo,
				text: `:peepoarrive: <@${sendFrom}> accepted your $TNDS request, they deposited *${amount} $TNDS* into your account`,
			});
		}
		catch (error) {
			console.error(error);
		}
	}
}