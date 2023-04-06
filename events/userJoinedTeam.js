import sequelize from '../lib/sequelize.js';
import initModels from '../models/index.js';
const { Users } = initModels(sequelize);

export const name = 'team_join';

export async function execute({ event }) {
	const { user } = event;
	const [record, created] = await Users.findOrCreate({
		where: { slack_id: user.id },
		defaults: {
			slack_id: user.id,
			points: 0,
		},
	});
}