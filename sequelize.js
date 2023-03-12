import Sequelize from 'sequelize';

const { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

// Initialize database connection within Sequelize
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
	host: DB_HOST,
	dialect: 'mysql',
});

export default sequelize;