import postAllLore from './lore/postAllLore.js';
import giveDailyPoints from './points/giveDailyPoints.js';

export default async function loadScheduledJobs() {
	// Give daily points
	await giveDailyPoints();

	// TODO: Load all messages into database from permalink by posting each lore one by one and parsing each URL attachment as an event. Remove once run on prod.
	await postAllLore();

	console.log('[Status] Scheduled future jobs');
}