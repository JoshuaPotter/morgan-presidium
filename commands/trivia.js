import activeTriviaQuestions from "../lib/trivia/activeTriviaQuestions.js";
import getTriviaQuestion from "../lib/trivia/getTriviaQuestion.js";

function setQuestion(question, answer) {
	const key = Buffer.from(answer.toLowerCase()).toString('base64');
	activeTriviaQuestions.setItem(key, JSON.stringify({ question, answer }));
	return key;
}

function removeQuestion(key) {
	activeTriviaQuestions.removeItem(key);
}

const questionTimeout = 30; // in seconds

export const name = 'trivia';

export async function execute({ ack, say }) {
	await ack({ 'response_type': 'in_channel' });

	const questions = await getTriviaQuestion();
	if (questions.ok) {
		for (const trivia of questions.data) {
			console.log(trivia);
			const { category, question, answer } = trivia;
			const key = setQuestion(question, answer);
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

			setTimeout(async () => {
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
			}, questionTimeout * 1000);
		}
	}
}