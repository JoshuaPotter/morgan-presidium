export default function(sequelize, DataTypes) {
	return sequelize.define('users', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			primaryKey: true,
		},
		slack_id: {
			type: DataTypes.STRING(30),
			allowNull: false,
			unique: 'slack_id_UNIQUE',
		},
		points: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
	}, {
		sequelize,
		tableName: 'users',
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
			{
				name: 'slack_id_UNIQUE',
				unique: true,
				using: 'BTREE',
				fields: [
					{ name: 'slack_id' },
				],
			},
		],
	}, { underscored: true });
};
