import { slackLinkRegex } from "../../lib/misc/isSlackLink.js";

// Bot hears one of the keywords in a message
const regexString = slackLinkRegex.toString();
const additionalRegex = regexString.slice(1, regexString.length - 1);
export const hears = new RegExp(`^<@U04T2FT1LHZ>\\s(${additionalRegex})$`);

// Event action
export async function execute({ message, say }) {
	const tokens = message.text.split(' ');
	tokens.shift();
	try {
		await say(`Did you mean \`/addquote ${Array.isArray(tokens) ? tokens.join(' ') : tokens}\`?`);
	}
	catch (error) {
		console.error(error);
	}
}