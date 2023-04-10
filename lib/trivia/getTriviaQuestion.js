import fetch from 'node-fetch';

const BASE_URL = 'https://api.api-ninjas.com/v1/trivia';

export default async function getTriviaQuestion(category) {
	const endpoint = category ? `${BASE_URL}?category=category` : BASE_URL;
	const obj = {
		ok: false,
	};
	try {
		const response = await fetch(endpoint, { headers: { 'X-Api-Key': process.env.API_NINJAS_KEY } });
		const data = await response.json();
		obj.ok = true;
		obj.data = data;
	}
	catch (error) {
		console.error(error);
	}
	return obj;
}