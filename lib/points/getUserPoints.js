import sequelize from '../sequelize.js';
import initModels from '../../models/index.js';
const { Users } = initModels(sequelize);

export default async function getUserPoints(slack_id) {
	const user = await Users.findOne({
		where: {
			slack_id,
		},
	});

	if (user === null) {
		return null;
	}

	return user.points;
}