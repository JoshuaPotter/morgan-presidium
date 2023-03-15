import givePoints from "../points/givePoints.js";
import sequelize from "../../sequelize.js";
import initModels from "../../models/index.js";
const { Lore } = initModels(sequelize);

const reactionPointValues = {
  "+1": 1,
  "-1": -1,
};
const reactions = Object.keys(reactionPointValues);

export default async function handleLoreReaction(reaction, quote, decrement = false) {    
    const pattern = new RegExp(/\*#(\d+)\*(.*)/);
    const patternMatches = quote.match(pattern);

    if(reactions.includes(reaction) && patternMatches.length) {
        const lore_id = patternMatches[1];
        const lore = await Lore.findOne({
            where: {
                lore_id
            }
        });
        if(lore !== null) {
            const points = reactionPointValues[reaction];
            await givePoints(lore.submitted_by, decrement ? -points*10 : points*10);
            await Lore.increment({ votes: decrement ? -points : points }, {
                where: {
                    lore_id
                }
            })
        }
    }
}