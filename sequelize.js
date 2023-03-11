const Sequelize = require('sequelize');

const { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

// Initialize database
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
	host: DB_HOST,
	dialect: 'mysql',
});

module.exports = sequelize;