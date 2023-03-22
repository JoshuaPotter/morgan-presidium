const possibleResponses = [
	'suh dude',
	'yea',
	'yes?',
	'yo',
	':catjam:',
];

// Bot hears this in a message
export const hears = 'hello';

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