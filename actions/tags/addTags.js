export const name = 'addTags';

export async function execute({ ack, body, client }) {
	await ack();

	// Open modal on add tags button click
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
				private_metadata: JSON.stringify({ channel, lore_id }),
				callback_id: 'addTags',
				title: {
					type: 'plain_text',
					text: `Add tags to quote #${lore_id}`,
				},
				blocks: [
					{
						type: 'section',
						text: {
							type: 'plain_text',
							text: 'Add multiple tags by separating with a comma (ex. first tag, second tag, third tag).',
							emoji: true,
						},
					},
					{
						type: 'input',
						block_id: 'addTagsBlock',
						element: {
							type: 'plain_text_input',
							action_id: 'addTagsInput',
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
					text: 'Add',
				},
			},
		});
	}
	catch (error) {
		console.error(error);
	}
}