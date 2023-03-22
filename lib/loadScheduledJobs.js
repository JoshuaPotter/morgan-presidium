import giveDailyPoints from './points/giveDailyPoints.js';

export default async function loadScheduledJobs(client) {
	// Give daily points
	await giveDailyPoints(client);

	console.log('[Status] Scheduled future jobs');
}