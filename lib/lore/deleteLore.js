import sequelize from '../sequelize.js';
import initModels from '../../models/index.js';
const { Lore, LoreTags } = initModels(sequelize);

export default async function deleteLore(lore_id) {
	const deletedLore = await Lore.destroy({
		where: {
			lore_id,
		},
	});
	await LoreTags.destroy({
		where: {
			lore_id,
		},
	});

	return deletedLore;
}