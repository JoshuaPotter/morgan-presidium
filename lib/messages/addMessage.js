import sequelize from '../sequelize.js';
import initModels from '../../models/index.js';
const { Messages } = initModels(sequelize);

export default async function addMessage({ lore_id, lore_url, author, text, ts }) {
	try {
		await Messages.create({
			lore_id,
			lore_url: encodeURIComponent(lore_url),
			author,
			text,
			ts,
		});
	}
	catch (error) {
		console.error(error);
	}
}