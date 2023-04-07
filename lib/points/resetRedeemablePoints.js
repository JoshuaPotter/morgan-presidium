import sequelize from '../sequelize.js';
import initModels from '../../models/index.js';
const { Users } = initModels(sequelize);

// Rest user redeemable flags.
async function resetUserAttributes(userId, localTime) {
	const { time, weekday, day } = localTime;
	const isMidnight = time === '00:00';
	const isNewWeek = weekday === 1;
	const isNewMonth = day === 1;
	const attributes = {};

	// Start of a new day...
	if (isMidnight) {
		attributes.redeemed_daily_points = 0;
	}
	// Start of new week (Monday)...
	if (isNewWeek & isMidnight) {
		attributes.redeemed_weekly_points = 0;
	}
	// Start of a new month...
	if (isNewMonth && isMidnight) {
		attributes.redeemed_monthly_points = 0;
	}

	return await Users.update(attributes, {
		where: {
			slack_id: userId,
		},
	});
}

// Get the time in a timezone and then pull out different values from the date time string.
function getLocalTime(tz) {
	const localTimeString = new Date().toLocaleString([], { timeZone: tz, hour12: false });
	const pattern = new RegExp(/(\d+)\/(\d+)\/(\d+), (\d+:\d+):\d+/);
	const matches = localTimeString.match(pattern);

	let obj;
	if (matches === null) {
		obj = null;
	}
	else {
		const weekday = new Date(localTimeString).getDay();
		const month = parseInt(matches[1]);
		const day = parseInt(matches[2]);
		const year = parseInt(matches[3]);
		const time = matches[4];

		obj = {
			weekday,
			month,
			day,
			year,
			time,
		};
	}

	return obj;
}

// Users aren't deleted or a bot 🤖
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
				await resetUserAttributes(id, localTime);
			});
		}
	}
	catch (error) {
		console.error(error);
	}
}