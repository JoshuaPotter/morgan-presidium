import { WebClient } from '@slack/web-api';
import { scheduleJob } from 'node-schedule';
import sequelize from '../sequelize.js';
import initModels from '../../models/index.js';
import { Op } from 'sequelize';

const { Lore } = initModels(sequelize);

export default async function postAllLore() {
	const index = 2384;

	const client = new WebClient(process.env.SLACK_BOT_TOKEN);
	const records = await Lore.findAll({
		attributes: [ 'lore_id', 'lore_url' ],
		where: {
			lore_id: {
				[Op.gt]: index,
			},
		},
	});

	let i = 0;
	scheduleJob('*/2 * * * * *', async () => {
		if (records.length && i < records.length) {
			const record = records[i];
			const { lore_id, lore_url } = record;
			let decoded;
			try {
				decoded = decodeURIComponent(lore_url);
			}
			catch (error) {
				decoded = unescape(lore_url);
			}
			await client.chat.postMessage({
				channel: 'U02NK9EAM',
				text: `*#${lore_id}* ${decoded}`,
			});
			i++;
		}
	});
}