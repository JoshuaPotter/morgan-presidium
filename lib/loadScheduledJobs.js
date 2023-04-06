import hourly from './jobs/hourly.js';

export default async function loadScheduledJobs(app) {
	await hourly(app.client);

	console.log('[Status] All jobs finished scheduling');
}