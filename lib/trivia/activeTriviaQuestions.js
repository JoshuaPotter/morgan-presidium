import { LocalStorage } from "node-localstorage";

export const questions = new LocalStorage('./triviaQuestions');

export default questions;

export function convertToKey(text) {
	return Buffer.from(text.toLowerCase()).toString('base64');
}

export function getQuestion(key) {
	return questions.removeItem(key);
}

export function setQuestion(question, answer) {
	const key = Buffer.from(answer.toLowerCase()).toString('base64');
	questions.setItem(key, JSON.stringify({ question, answer }));
	return key;
}

export function removeQuestion(key) {
	questions.removeItem(key);
}

export function hasQuestions() {
	return questions.length > 0;
}