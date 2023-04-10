export default (sendTo, amount) => {
	return [
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
	];
};
