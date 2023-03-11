const DataTypes = require('sequelize').DataTypes;
const _channel = require('./channel');
const _lore = require('./lore');
const _tags = require('./tags');
const _tags_lore = require('./tags_lore');
const _transactions = require('./transactions');
const _users = require('./users');

function initModels(sequelize) {
	const Channels = _channel(sequelize, DataTypes);
	const Lore = _lore(sequelize, DataTypes);
	const Tags = _tags(sequelize, DataTypes);
	const LoreTags = _tags_lore(sequelize, DataTypes);
	const Transactions = _transactions(sequelize, DataTypes);
	const Users = _users(sequelize, DataTypes);

	return {
		Channels,
		Lore,
		Tags,
		LoreTags,
		Transactions,
		Users,
	};
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
