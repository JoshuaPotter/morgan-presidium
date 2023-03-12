import sequelize from '../../sequelize.js';
import initModels from '../../models/index.js';
const { Lore } = initModels(sequelize);

export default async function addLore({ lore_url, submitted_by }) {
    const newLore = await Lore.create({
        lore_url,
        submitted_by
    });

    return newLore;
};