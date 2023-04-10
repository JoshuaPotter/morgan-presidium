import incrementPoints from "../lib/points/incrementPoints.js";
import activeTriviaQuestions from "../lib/trivia/activeTriviaQuestions.js";

export const hears = new RegExp(/^(.*)$/);

export async function execute({ message, say }) {
	if (activeTriviaQuestions.length) {
		console.log(message);
		const { user, bot_id, text } = message;

		// User is not a bot
		if (user === 'USLACKBOT' || bot_id !== undefined) {
			return;
		}

		const key = Buffer.from(text.toLowerCase()).toString('base64');
		if (activeTriviaQuestions.getItem(key) !== null) {
			activeTriviaQuestions.removeItem(key);
			await say(`:sparkles: *Correct!* +10 $TNDS to <@${user}>`);
			incrementPoints(user, 10);
		}
	}
}