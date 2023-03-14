import handleQuoteReaction from "../../lib/reactions/handleQuoteReaction.js";

const appUserId = "U04T2FT1LHZ";

// Event  name
export const name = "reaction_added";

// Event action
export async function execute({ event, client }) {
	// User reacted to quote posted by bot
	const { item_user: itemUserId, user: userId, item: { channel, ts }, reaction } = event;

	if(itemUserId === undefined || userId === undefined) {
		return false;
	}

	//  If the item the user reacting to is from the bot and the user reacting isn't the bot
	if(itemUserId === appUserId && userId !== appUserId) {
		try {
			// Get the message contents of the message that was reacted to. 
			// Use this to get the quote id & who submitted it.
			const response = await client.conversations.history({
				channel,
				latest: ts,
				inclusive: true,
				limit: 1,
			});
			if(response.ok) {
				const { text: quote } = response.messages[0];
				handleQuoteReaction(reaction, quote);
			}
		}
		catch (error) {
			console.error(error);
		}
	}
};