import giveDailyPoints from './points/giveDailyPoints.js';

export default async function loadScheduledJobs() {
	// Give daily points
	await giveDailyPoints();

	console.log('[Status] Scheduled future jobs');
}