import getLore from "../../lib/lore/getLore.js";

function formatBlocks (id, name, votes, tags = []) {
	const blocks =  [
		{
			type: "context",
			elements: [
				{
					type: "mrkdwn",
					text: `*Submitted*: ${name}`,
				},
			],
		},
		{
		  type: "actions",
		  elements: [
			{
			  type: "button",
			  text: {
				type: "plain_text",
				text: "Add Tags",
				emoji: true,
			  },
			  action_id: "addTags",
			  value: `${id}`,
			},
			{
			  type: "button",
			  text: {
				type: "plain_text",
				text: "Delete Quote",
				emoji: true,
			  },
			  action_id: "deleteQuote",
			  value: `${id}`,
			  style: "danger",
			},
		  ],
		},
	];
	if (tags.length) {
		blocks[0].elements.push({
			type: "mrkdwn",
			text: `*Tags*: \`${tags.join("` `")}\``,
		});
	}
	blocks[0].elements.push({
		type: "mrkdwn",
		text: `*Votes*: ${votes}`,
	})

	return blocks;
}

// Command name
export const name = "quote";

// Command action
export async function execute ({ client, command, ack, say }) {
	// Acknowledge command request
	await ack({"response_type": "in_channel"});

	try {
		const lore = await getLore(command.text);
		if (lore !== null) {
			const { lore_url, lore_id, submitted_by, tags, votes } = lore;

			// Reply with quote
			const message = await say(`*#${lore_id}* ${decodeURIComponent(lore_url)}`);

			// Get display name from user id
			const result = await client.users.info({
				user: submitted_by
			});
			const name = result.ok ? result.user.profile.display_name : submitted_by;
			
			// Add thread reply with quote details
			const blocks = formatBlocks(lore_id, name, votes, tags);
			await say({ blocks, text: 'Quote details', thread_ts: message.ts });

			// Add voting reactions
			await client.reactions.add({
				channel: message.channel, 
				name: '+1', 
				timestamp: message.ts
			});
			await client.reactions.add({
				channel: message.channel, 
				name: '-1', 
				timestamp: message.ts
			});

			return true;
		}
	} 
	catch (error) {
		console.log(error);
	}

	return await say('No lore found :feelsdankman:');
};
