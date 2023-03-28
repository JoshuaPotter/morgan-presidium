import postAllLore from './lore/postAllLore.js';
import giveDailyPoints from './points/giveDailyPoints.js';

export default async function loadScheduledJobs(client) {
	// Give daily points
	await giveDailyPoints(client);

	// TODO: Load all messages into database from permalink by posting each lore one by one and parsing each URL attachment as an event. Remove once run on prod.
	// await postAllLore(client);

	console.log('[Status] Scheduled future jobs');
}