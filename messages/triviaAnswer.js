import incrementPoints from '../lib/points/incrementPoints.js';
import { hasQuestions, compareAnswer } from '../lib/trivia/activeTriviaQuestions.js';

export const hears = new RegExp(/^(.*)$/);

export async function execute({ message, say }) {
	if (hasQuestions) {
		const { user, bot_id, text } = message;

		// User is not a bot
		if (user === 'USLACKBOT' || bot_id !== undefined) {
			return;
		}

		// Check if the text is the answer to any active questions. If correct, remove trivia question from the pool and assign points to user.
		const comparison = compareAnswer(text);
		if (comparison.isCorrect) {
			try {
				await incrementPoints(user, 10);
				await say(`:sparkles: *Correct (response time: ${comparison.responseTime}s)!* <@${user}> received *10 $TNDS*.`);
			}
			catch (error) {
				console.error(error);
			}
		}
	}
}