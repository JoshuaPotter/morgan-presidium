import sequelize from "../../sequelize.js";
import initModels from "../../models/index.js";
const { LoreTags, Tags } = initModels(sequelize);

export default async function removeTags(lore_id, tags) {
    let arr;
    if(!Array.isArray(tags)) {
        arr = [tags];
    } else {
        arr =  [...tags];
    }

    const tags = await Tags.findAll({
        where: {
            tag_title: arr
        }
    });
    
    const deletedTags = await LoreTags.destroy({
        where: {
            tag_id: tags.map(tag => tag.tag_id),
            lore_id
        }
    });

    return deletedTags;
}