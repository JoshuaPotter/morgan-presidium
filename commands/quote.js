import getLore from "../lib/lore/getLore";

// Command name
export const name = "quote";

// Command action
export async function execute({ command, ack, say }) {
	// Acknowledge command request
	await ack();

	try {
		const lore = await getLore(command.text);
		if (lore === null) {
			await say('No lore found :feelsdankman:');
		}
		else {
			const { lore_url, lore_id, tags } = lore;
			await say(`*#${lore_id}* ${decodeURIComponent(lore_url)}`);
			if (tags.length) {
				await say(`Tags: ${tags.join(', ')}`);
			}
		}
	} 
	catch (error) {
		console.log(error);
	}
};
