const possibleResponses = [
	"np",
	"no worries",
	"always",
	"i got you doggy dog",
];

// Bot listens for these keywords
const keywords = [
	'thanks',
	'thank you',
].join('|');
// Bot hears one of the keywords in a message
export const hears = new RegExp(`.*(${keywords}).*`);

// Event action
export async function execute({ say }) {
	const message = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
	try {
		await say(message);
	}
	catch (error) {
		console.error(error);
	}
}