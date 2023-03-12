export default function(sequelize, DataTypes) {
	return sequelize.define('tags_lore', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		tag_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		lore_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	}, {
		sequelize,
		tableName: 'tags_lore',
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
				name: 'tag_id',
				using: 'BTREE',
				fields: [
					{ name: 'tag_id' },
				],
			},
			{
				name: 'lore_id',
				using: 'BTREE',
				fields: [
					{ name: 'lore_id' },
				],
			},
		],
	}, { underscored: true });
};
