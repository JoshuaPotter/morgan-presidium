import Sequelize from 'sequelize';

export default function(sequelize, DataTypes) {
	return sequelize.define('lore', {
		lore_id: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		lore_url: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		votes: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		submitted_by: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
		},
	}, {
		sequelize,
		tableName: 'lore',
		timestamps: false,
		indexes: [
			{
				name: 'PRIMARY',
				unique: true,
				using: 'BTREE',
				fields: [
					{ name: 'lore_id' },
				],
			},
			{
				name: 'lore_id',
				unique: true,
				using: 'BTREE',
				fields: [
					{ name: 'lore_id' },
				],
			},
		],
	}, { underscored: true });
};
