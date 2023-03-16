import incrementPoints from './incrementPoints.js';

export default async function decrementPoints(slack_id, points) {
	await incrementPoints(slack_id, -points);
}