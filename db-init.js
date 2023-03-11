/**
 * This file creates database tables from models.
 * Instructions: You only need to run node dbInit.js once. You should only run it again if you add or edit models.
 * If you change a model, you can execute node dbInit.js --force or node dbInit.js -f to force sync tables. It will empty and remake your model tables.
 * Otherwise, do not use the force flag.
 */
const Sequelize = require('sequelize');
const initModels = require('./models');
require('dotenv').config();

const { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

// Initialize database
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

initModels(sequelize);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);