import { LocalStorage } from "node-localstorage";

const activeTriviaQuestions = new LocalStorage('./triviaQuestions');

export default activeTriviaQuestions;