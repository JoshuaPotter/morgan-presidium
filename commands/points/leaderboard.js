import sequelize from "../../sequelize.js";
import initModels from "../../models/index.js";
import { format } from "path";
const { Users } = initModels(sequelize);

export const name = "leaderboard";

export async function execute({ ack, client, command, say }) {
	await ack({ response_type: 'in_channel' });

	const users = await Users.findAll({
		order: [['points', 'DESC']],
	});
	const formattedUsers = await Promise.all(users.map(async (user, index) => {
		const request = await client.users.info({ user: user.slack_id });
		if (request.ok) {
			return `*#${index + 1}*. <@${user.slack_id}> — ${user.points}`;
		}
		else {
			return `*#${index + 1}*. <@${user.slack_id}> — ${user.points}`;
		}
	}));

	await say(`:technologist: :chart_with_upwards_trend: Users with the most tenders :tendie:\n\n${formattedUsers.join('\n')}`);
}