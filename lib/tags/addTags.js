import sequelize from '../../sequelize.js';
import initModels from '../../models/index.js';
const { LoreTags, Tags } = initModels(sequelize);

export default async function addTags(lore_id, tags) {
	let arr;
	if (!Array.isArray(tags)) {
		arr = [tags];
	}
	else {
		arr = [...tags];
	}

	const addedTags = arr.reduce(async (accumulator, tag_title) => {
		// Create a tag if it doesn't exist
		const tag = await Tags.findOrCreate({
			where: {
				tag_title,
			},
			defaults: {
				tag_title,
			},
		});

		// Assign the tag to lore
		const tag_id = tag.tag_id;
		const loreTag = await LoreTags.findOrCreate({
			where: {
				tag_id,
				lore_id,
			},
			defaults: {
				tag_id,
				lore_id,
			},
		});

		return accumulator && tag !== null && loreTag !== null;
	}, 1);

	return addedTags;
}