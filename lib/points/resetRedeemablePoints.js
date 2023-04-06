import sequelize from '../sequelize.js';
import initModels from '../../models/index.js';
const { Users } = initModels(sequelize);

async function resetDailyPoints(userId, localTime) {
	if (localTime.indexOf('12:00:00 AM') !== -1) {
		await Users.update({ redeemed_daily_points: 0 }, {
			where: {
				slack_id: userId,
			},
		});
	}
}

function getLocalTime(tz) {
	const date = new Date();
	return date.toLocaleString('en-US', { timeZone: tz });
}

function getActiveWorkspaceUsers(users) {
	return users.filter(user => !user.deleted && !user.is_bot);
}

export default async function resetRedeemablePoints(client) {
	try {
		const workspaceUsers = await client.users.list();
		if (workspaceUsers.ok) {
			const activeWorkspaceUsers = getActiveWorkspaceUsers(workspaceUsers.members);
			activeWorkspaceUsers.forEach(async user => {
				const { tz, id } = user;
				const localTime = getLocalTime(tz);

				// Check if it's midnight in each user's timezone and, if so, reset the flag.
				await resetDailyPoints(id, localTime);
			});
		}
	}
	catch (error) {
		console.error(error);
	}
}