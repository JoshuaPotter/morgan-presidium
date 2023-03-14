import givePoints from "../points/givePoints.js";
import sequelize from "../../sequelize.js";
import initModels from "../../models/index.js";
const { Lore } = initModels(sequelize);

const reactionPointValues = {
  "+1": 10,
  "-1": -10,
};
const reactions = Object.keys(reactionPointValues);

export default async function handleLoreReaction(reaction, quote, decrement = false) {
	if(!reactions.includes(reaction)) {
		return false;
	}
    
    const pattern = new RegExp(/\*#(\d+)\*(.*)/);
    const patternMatches = quote.match(pattern);

    if(patternMatches.length) {
        const id = patternMatches[1];
        const lore = await Lore.findOne({
            where: {
                lore_id: id
            }
        });
        if(lore !== null) {
            const points = reactionPointValues[reaction];
            await givePoints(lore.submitted_by, decrement ? -points : points);
        }
    }
}