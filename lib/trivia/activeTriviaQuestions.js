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
	const ts = timestamp();
	questions.set(key, { question, answer, timeoutId, ts });
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
	const obj = { isCorrect: false };
	if (trivia !== null) {
		clearTimeout(trivia.timeoutId);
		removeQuestion(key);
		obj.isCorrect = true;
		obj.responseTime = (timestamp() - trivia.ts) / 1000;
	}
	return obj;
}

function timestamp() {
	return new Date().getTime();
}