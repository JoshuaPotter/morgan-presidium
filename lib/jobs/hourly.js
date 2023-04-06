import { scheduleJob } from 'node-schedule';
import resetDailyPoints from '../points/resetDailyPoints.js';

export default async function hourly(client) {
	scheduleJob('0 0 * * *', async () => {
		// Reset redeemed daily points flag when it's midnight in each user's timezone
		await resetDailyPoints(client);
	});

	console.log('[Status] Scheduled hourly jobs');
}