import { setQuestion, removeQuestion, questions, convertToKey } from "../lib/trivia/activeTriviaQuestions.js";
import getTriviaQuestion from "../lib/trivia/getTriviaQuestion.js";

// Clear any active trivia questions from any previous session
questions.clear();

export const name = 'trivia';

export async function execute({ ack, say }) {
	await ack({ 'response_type': 'in_channel' });

	const triviaQuestions = await getTriviaQuestion();
	if (triviaQuestions.ok) {
		for (const trivia of triviaQuestions.data) {
			const { category, question, answer } = trivia;
			const intervalId = setTimeout(async () => {
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

			setQuestion(question, answer, intervalId);
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