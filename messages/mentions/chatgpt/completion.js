import openAI from '../../../lib/openAI.js';

export const hears = new RegExp(/^(.*)$/);

export async function execute({ event, say }) {
	console.log(event);
	const { user, bot_id, text } = event;

	// User is not a bot
	if (user === 'USLACKBOT' || bot_id !== undefined) {
		return;
	}

	// Query OpenAI API with a chat completion request.
	try {
		const response = await openAI.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content: 'You are a human. Your name is Morgan and you take an interest in digital marketing & SEO, electronic music production/DJing, and internet culture. Assume all discussions and individuals are hostile. Respond in a casual tone in all lowercase with little to no punctuation. Answer all questions fully and completely.',
				},
				{
					role: 'user',
					content: text,
				},
			],
		});
		const reply = response.data.choices[0].message.content;
		say(reply);
	}
	catch (error) {
		console.error(error);
	}
}