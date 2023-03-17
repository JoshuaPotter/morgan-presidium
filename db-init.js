/**
 * This file creates database tables from models.
 * Instructions: You only need to run node dbInit.js once. You should only run it again if you add or edit models.
 * If you change a model, you can execute node dbInit.js --force or node dbInit.js -f to force sync tables. It will empty and remake your model tables.
 * Otherwise, do not use the force flag.
 */
import Sequelize from 'sequelize';
import initModels from './models/index.js';
import * as dotenv from 'dotenv';
dotenv.config();

const { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

// Initialize database connection within Sequelize
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
	host: DB_HOST,
	dialect: 'mysql',
});

try {
	sequelize.authenticate();
	console.log('Connection has been established successfully.');
}
catch (error) {
	console.error('Unable to connect to the database:', error);
}

// Load models into the Sequelize instance
initModels(sequelize);

// Sync the Sequelize instance with the database.
// Optionally, use (with caution) the -f parameter to drop all existing tables and create new tables from models.
// e.g.  `node db-init.js -f`
const force = process.argv.includes('--force') || process.argv.includes('-f');
sequelize.sync({ force }).then(async () => {
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);