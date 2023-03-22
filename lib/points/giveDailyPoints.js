import incrementPoints from './incrementPoints.js';
import { scheduleJob } from 'node-schedule';

function getUserIds(users) {
	const activeUsers = users.filter(user => !user.deleted && !user.is_bot);
	const activeUserIds = activeUsers.map(user => user.id);
	return activeUserIds;
}

async function job(client) {
	const users = await client.users.list();
	const activeUserIds = getUserIds(users);
	const points = 120;
	incrementPoints(activeUserIds, points);
	await client.chat.postMessage({
		text: `Distributed *${points} $TNDS* to all accounts as part of daily $TNDS payment, please gamble responsibly :tendie:`,
		channel: 'C17RAM72R',
	});
}

export default async function giveDailyPoints(client) {
	const schedule = '30  5 * * *';
	scheduleJob(schedule, async () => await job(client));
}