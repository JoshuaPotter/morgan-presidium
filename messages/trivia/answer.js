import incrementPoints from '../../lib/points/incrementPoints.js';
import { hasQuestions, compareAnswer } from '../../lib/trivia/activeTriviaQuestions.js';

export const hears = new RegExp(/^(.*)$/);

export async function execute({ message, say }) {
	if (hasQuestions) {
		const { user, bot_id, text } = message;

		// User is not a bot
		if (user === 'USLACKBOT' || bot_id !== undefined) {
			return;
		}

		// Check if the text is the answer to any active questions. If correct, remove trivia question from the pool and assign points to user.
		const { isCorrect, responseTime } = compareAnswer(text);
		if (isCorrect) {
			try {
				const awardedPoints = responseTime < 6 ? 50 : 20;
				await incrementPoints(user, awardedPoints);
				await say(`:sparkles: *Correct (response time: ${responseTime}s)!* <@${user}> received *${awardedPoints} $TNDS*.`);
			}
			catch (error) {
				console.error(error);
			}
		}
	}
}