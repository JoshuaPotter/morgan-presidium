// Bot hears one of the keywords in a message
export const hears = new RegExp(/^<@U04T2FT1LHZ>\s?$/);

// Event action
export async function execute({ say }) {
	try {
		await say('Did you mean `/quote`?');
	}
	catch (error) {
		console.error(error);
	}
}