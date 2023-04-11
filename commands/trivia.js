import { setQuestion, removeQuestion, convertToKey } from '../lib/trivia/activeTriviaQuestions.js';
import getTriviaQuestion from '../lib/trivia/getTriviaQuestion.js';

export const name = 'trivia';

export async function execute({ ack, say }) {
	await ack({ 'response_type': 'in_channel' });

	try {
		const triviaQuestions = await getTriviaQuestion();
		if (triviaQuestions.ok) {
			for (const trivia of triviaQuestions.data) {
				const { category, question, answer } = trivia;

				// Setup timer to wait for the answer, remove question from the pool once timer has elapsed.
				const timeoutId = setTimeout(async () => {
					const key = convertToKey(answer);
					removeQuestion(key);
					await say({
						text: `*Out of time!* The correct answer was *${answer}* :val:`,
						blocks: [
							{
								type: 'section',
								text: {
									type: 'mrkdwn',
									text: `*Out of time!* The correct answer was *${answer}* :val:`,
								},
							},
							{
								type: 'divider',
							},
							{
								type: 'context',
								elements: [
									{
										type: 'mrkdwn',
										text: `*Question*: ${question}`,
									},
									{
										type: 'mrkdwn',
										text: `*Category*: ${category.charAt(0).toUpperCase()}${category.slice(1)}`,
									},
								],
							},
						],
					});
				}, 30 * 1000);

				// Add question to the pool of active questions and send to channel.
				setQuestion(question, answer, timeoutId);
				await say({
					text: question,
					blocks: [
						{
							type: 'section',
							text: {
								type: 'mrkdwn',
								text: question,
							},
						},
						{
							type: 'divider',
						},
						{
							type: 'context',
							elements: [
								{
									type: 'mrkdwn',
									text: `*Category*: ${category.charAt(0).toUpperCase()}${category.slice(1)}`,
								},
							],
						},
					],
				});
			}
		}
	}
	catch (error) {
		console.error(error);
	}
}