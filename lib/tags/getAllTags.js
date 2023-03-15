import sequelize from '../../sequelize.js';
import initModels from '../../models/index.js';
const { Tags } = initModels(sequelize);

export default async function getAllTags() {
	const tags = await Tags.findAll({
		order: [['tag_title', 'ASC']],
	});

	const alphabetizedTags = {};
	tags.forEach(tag => {
		const title = tag.tag_title;
		const letter = title.charAt(0).toUpperCase();
		if (!Array.isArray(alphabetizedTags[letter])) {
			alphabetizedTags[letter] = [title];
		}
		else {
			alphabetizedTags[letter].push(title);
		}
	});
	return alphabetizedTags;
}