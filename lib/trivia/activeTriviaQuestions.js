export const questions = new Map();

export default questions;

export function convertToKey(text) {
	return text.toLowerCase();
}

export function getQuestion(key) {
	let trivia = questions.get(key);
	if (typeof trivia === 'undefined') {
		trivia = null;
	}
	return trivia;
}

export function setQuestion(question, answer, timeoutId) {
	const key = convertToKey(answer);
	questions.set(key, { question, answer, timeoutId });
	return key;
}

export function removeQuestion(key) {
	questions.delete(key);
}

export function hasQuestions() {
	return questions.size > 0;
}

export function compareAnswer(text) {
	const key = convertToKey(text);
	const trivia = getQuestion(key);
	let isCorrect = false;
	if (trivia !== null) {
		clearTimeout(trivia.timeoutId);
		removeQuestion(key);
		isCorrect = true;
	}
	return isCorrect;
}