export const name = 'removeTags';

export async function execute({ ack, body, client }) {
	await ack();

	// Open modal on remove tags button click
	const channel = body.channel.id;
	const { value: lore_id } = body.actions[0];
	try {
		await client.views.open({
			// Pass a valid trigger_id within 3 seconds of receiving it
			trigger_id: body.trigger_id,
			// View payload
			view: {
				type: 'modal',
				// View identifier
				callback_id: 'removeTags',
				private_metadata: JSON.stringify({ channel, lore_id }),
				title: {
					type: 'plain_text',
					text: `Remove tags from #${lore_id}`,
				},
				blocks: [
					{
						type: 'section',
						text: {
							type: 'plain_text',
							text: 'Remove one or more tags by separating with a comma (ex. first tag, second tag, third tag).',
							emoji: true,
						},
					},
					{
						type: 'input',
						block_id: 'removeTagsBlock',
						element: {
							type: 'plain_text_input',
							action_id: 'removeTagsInput',
							focus_on_load: true,
							placeholder: {
								type: 'plain_text',
								text: 'First tag, Second tag',
							},
							min_length: 2,
						},
						label: {
							type: 'plain_text',
							text: 'Tags',
							emoji: true,
						},
					},
				],
				close: {
					type: 'plain_text',
					text: 'Cancel',
				},
				submit: {
					type: 'plain_text',
					text: 'Remove',
				},
			},
		});
	}
	catch (error) {
		console.error(error);
	}
}