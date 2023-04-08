import { scheduleJob } from 'node-schedule';
import resetRedeemablePoints from '../points/resetRedeemablePoints.js';

export default async function hourly(client) {
	scheduleJob('0 * * * *', async () => {
		// This is run hourly because it resets user properties at midnight and we want to account for users in different timezones.
		await resetRedeemablePoints(client);
	});

	console.log('[Status] Scheduled hourly jobs');
}