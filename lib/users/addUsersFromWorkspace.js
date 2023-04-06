import sequelize from '../sequelize.js';
import initModels from '../../models/index.js';
const { Users } = initModels(sequelize);

function getActiveUsers(users) {
	const activeUsers = users.filter(user => !user.deleted && !user.is_bot);
	return activeUsers;
}

export default async function addUsersFromWorkspace(client) {
	try {
		const { members } = await client.users.list();
		const activeUsers = getActiveUsers(members);
		for (const user of activeUsers) {
			const [record, created] = await Users.findOrCreate({
				where: { slack_id: user.id },
				defaults: {
					slack_id: user.id,
					points: 0,
				},
			});
		}
	}
	catch (error) {
		console.error(error);
	}
}