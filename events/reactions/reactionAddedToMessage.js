import givePoints from "../../lib/points/givePoints.js";

const appUserId = "U04T2FT1LHZ";

// Event  name
export const name = "reaction_added";

// Event action
export async function execute({ event, client }) {
	// User reacted to another user
	const { item_user: itemUserId, user: userId } = event;

	if(itemUserId === undefined || userId === undefined) {
		return false;
	}

	// If the item the user reacting to isn't from the bot, and the user reacting isn't the bot, and the item the user reacting to wasn't posted themselves
	if(itemUserId !== appUserId && userId !== appUserId && itemUserId !== userId) {
		try {
			await givePoints(itemUserId, 10);
		}
		catch (error) {
			console.error(error);
		}
	}
};