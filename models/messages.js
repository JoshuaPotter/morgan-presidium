export default function(sequelize, DataTypes) {
	return sequelize.define('messages', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		lore_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		lore_url: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		text: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		author: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		ts: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
	}, {
		sequelize,
		tableName: 'messages',
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
				name: 'id',
				unique: true,
				using: 'BTREE',
				fields: [
					{ name: 'id' },
				],
			},
			{
				name: 'lore_id',
				using: 'BTREE',
				fields: [
					{ name: 'lore_id' },
				],
			},
			{
				name: 'lore_url',
				using: 'BTREE',
				fields: [
					{ name: 'lore_url' },
				],
			},
			{
				name: 'author',
				using: 'BTREE',
				fields: [
					{ name: 'author' },
				],
			},
			{
				name: 'ts',
				using: 'BTREE',
				fields: [
					{ name: 'ts' },
				],
			},
		],
	}, { underscored: true });
}
