import getLore from "../lib/lore/getLore.js";

// Command name
export const name = "quote";

// Command action
export async function execute({ client, command, ack, say }) {
	// Acknowledge command request
	await ack();

	try {
		const lore = await getLore(command.text);
		if (lore !== null) {
			const { lore_url, lore_id, tags, votes, submitted_by } = lore;

			// Reply wth quote
			const message = await say(`*#${lore_id}* ${decodeURIComponent(lore_url)}`);

			// Add thread reply with quote details
			const result = await client.users.info({
				user: submitted_by
			});
			const blocks =  [
				{
					type: "context",
					elements: [
					{
						type: "mrkdwn",
						text: `Votes: ${votes}`,
					},
					{
						type: "mrkdwn",
						text: `Submitted By: ${result.ok ? result.user.name : submitted_by}`,
					},
					],
				}
			];
			if (tags.length) {
				blocks[0].elements.push({
					type: "mrkdwn",
					text: `Tags: \`${tags.join("` `")}\``,
				});
			}
			await say({ text: 'Quote details', blocks, thread_ts: message.ts });

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
