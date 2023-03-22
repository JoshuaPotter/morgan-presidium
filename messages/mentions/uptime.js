export const name = 'uptime';

export async function execute({ say }) {
	const seconds = process.uptime();
	const hours = Math.floor(seconds / (60 * 60)) / 24;
	const uptime = hours.toFixed(1);
	await say(`I have have been online for *${uptime} days*`);
}