const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('transactions', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		slack_id: {
			type: DataTypes.STRING(45),
			allowNull: false,
		},
		points: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		timestamp: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
		},
	}, {
		sequelize,
		tableName: 'transactions',
		timestamps: false,
		indexes: [
			{
				name: 'PRIMARY',
				unique: true,
				using: 'BTREE',
				fields: [
					{ name: 'id' },
				],
			},
			{
				name: 'id_UNIQUE',
				unique: true,
				using: 'BTREE',
				fields: [
					{ name: 'id' },
				],
			},
		],
	}, { underscored: true });
};
