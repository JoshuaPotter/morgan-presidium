import sequelize from '../sequelize.js';
import initModels from '../../models/index.js';
import isSlackLink from '../misc/isSlackLink.js';
const { Lore } = initModels(sequelize);

export default async function addLore({ lore_url, submitted_by }) {
	if (isSlackLink(lore_url)) {
		return await Lore.create({
			lore_url: encodeURIComponent(lore_url),
			submitted_by,
		});
	}

	return null;
}