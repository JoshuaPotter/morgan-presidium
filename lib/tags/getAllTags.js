import sequelize from '../sequelize.js';
import initModels from '../../models/index.js';
const { Tags } = initModels(sequelize);

export default async function getAllTags() {
	const tags = await Tags.findAll({
		attributes: ['tag_title'],
		order: [['tag_title', 'ASC']],
	});

	const alphabetizedTags = {};
	tags.forEach(tag => {
		const title = tag.tag_title;
		const letter = title.charAt(0);
		const isNum = /^\d$/.test(letter);
		const index = isNum ? '#' : letter.toUpperCase();
		if (!Array.isArray(alphabetizedTags[index])) {
			alphabetizedTags[index] = [title];
		}
		else {
			alphabetizedTags[index].push(title);
		}
	});
	return alphabetizedTags;
}