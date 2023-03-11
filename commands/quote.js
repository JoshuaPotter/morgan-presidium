const getQuoteById = require('../lib/quotes/getQuoteById');
const getQuoteByTag = require('../lib/quotes/getQuoteByTag');
const getRandomQuote = require('../lib/quotes/getRandomQuote');

const getQuote = async (filter = '') => {
	const parsedNumber = parseInt(filter);

	let quote = null;
	if (filter && !isNaN(parsedNumber)) {
		// Get quote by id
		quote = getQuoteById(parsedNumber);
	}
	else if (filter && isNaN(parsedNumber)) {
		// Get quote by tag
		quote = getQuoteByTag(filter);
	}
	else {
		quote = getRandomQuote();
	}
	return quote;
};

module.exports = {
	name: 'quote',
	async execute({ command, ack, say }) {
		// Acknowledge command request
		await ack();

		const quote = await getQuote(command.text);
		if (quote === null) {
			await say('No quote found :feelsdankman:');
		}
		else {
			const { lore_url, lore_id } = quote;
			await say(`*#${lore_id}* ${decodeURIComponent(lore_url)}`);
		}
	},
};