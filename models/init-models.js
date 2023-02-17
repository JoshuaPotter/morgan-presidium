const DataTypes = require('sequelize').DataTypes;
const _channel = require('./channel');
const _lore = require('./lore');
const _tags = require('./tags');
const _tags_lore = require('./tags_lore');
const _transactions = require('./transactions');
const _users = require('./users');

function initModels(sequelize) {
	const channel = _channel(sequelize, DataTypes);
	const lore = _lore(sequelize, DataTypes);
	const tags = _tags(sequelize, DataTypes);
	const tags_lore = _tags_lore(sequelize, DataTypes);
	const transactions = _transactions(sequelize, DataTypes);
	const users = _users(sequelize, DataTypes);


	return {
		channel,
		lore,
		tags,
		tags_lore,
		transactions,
		users,
	};
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
