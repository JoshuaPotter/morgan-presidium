const possibleResponses = [
	'it\'s ok',
	'no worries',
	'that\'s alright',
	'np :)',
];

// Bot hears this in a message
export const hears = 'sorry';

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