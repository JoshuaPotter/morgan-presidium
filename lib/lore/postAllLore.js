import { WebClient } from '@slack/web-api';
import { scheduleJob } from 'node-schedule';
import sequelize from '../sequelize.js';
import initModels from '../../models/index.js';

const { Lore } = initModels(sequelize);

export default async function postAllLore() {
	const client = new WebClient(process.env.SLACK_BOT_TOKEN);
	const records = await Lore.findAll({ attributes: [ 'lore_id', 'lore_url' ] });

	let i = 0;
	scheduleJob('*/2 * * * * *', async () => {
		const record = records[i];
		const { lore_id, lore_url } = record;
		await client.chat.postMessage({
			channel: 'U02NK9EAM',
			text: `*#${lore_id}* ${decodeURIComponent(lore_url)}`,
		});
		i++;
	});
}