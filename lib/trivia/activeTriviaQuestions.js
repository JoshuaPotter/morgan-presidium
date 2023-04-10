import { LocalStorage } from "node-localstorage";

export const questions = new LocalStorage('./triviaQuestions');

export default questions;

export function convertToKey(text) {
	return Buffer.from(text.toLowerCase()).toString('base64');
}

export function getQuestion(key) {
	let trivia = questions.getItem(key);
	if (trivia === null) {
		trivia = JSON.parse(trivia);
	}
	return trivia;
}

export function setQuestion(question, answer, intervalId) {
	const key = Buffer.from(answer.toLowerCase()).toString('base64');
	questions.setItem(key, JSON.stringify({ question, answer, intervalId }));

	return key;
}

export function removeQuestion(key) {
	const trivia = getQuestion(key);
	clearInterval(trivia.intervalId);
	questions.removeItem(key);
}

export function hasQuestions() {
	return questions.length > 0;
}