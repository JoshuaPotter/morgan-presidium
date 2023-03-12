import { DataTypes } from 'sequelize';
import _channel from './channel.js';
import _lore from './lore.js';
import _tags from './tags.js';
import _tags_lore from './tags_lore.js';
import _transactions from './transactions.js';
import _users from './users.js';

export default function initModels(sequelize) {
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