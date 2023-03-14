import sequelize from '../../sequelize.js';
import initModels from '../../models/index.js';
const { Users } = initModels(sequelize);

export default async function givePoints(slack_id, points) {
    return await Users.increment({ points }, {
        where: {
            slack_id
        }
    });
}