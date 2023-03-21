export const hears = "It's a vape and skrillex kind of night.";

export async function execute({ message, say }) {
	const { user, bot_id } = message;

	// User is not a bot
	if (user !== 'USLACKBOT' && bot_id === undefined) {
		await say(hears);
	}
}