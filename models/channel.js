module.exports = function(sequelize, DataTypes) {
	return sequelize.define('channel', {
		title: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
	}, {
		sequelize,
		tableName: 'channel',
		timestamps: true,
		indexes: [
			{
				name: 'PRIMARY',
				unique: true,
				using: 'BTREE',
				fields: [
					{ name: 'id' },
				],
			},
		],
	});
};
