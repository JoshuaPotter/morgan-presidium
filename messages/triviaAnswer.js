import incrementPoints from "../lib/points/incrementPoints.js";
import { hasQuestions, getQuestion, removeQuestion, convertToKey } from "../lib/trivia/activeTriviaQuestions.js";

export const hears = new RegExp(/^(.*)$/);

export async function execute({ message, say }) {
	if (hasQuestions) {
		const { user, bot_id, text } = message;

		// User is not a bot
		if (user === 'USLACKBOT' || bot_id !== undefined) {
			return;
		}

		const key = convertToKey(text);
		if (getQuestion(key) !== null) {
			removeQuestion(key);
			incrementPoints(user, 10);
			await say(`:sparkles: *Correct! <@${user}> received *10 $TNDS*`);
		}
	}
}