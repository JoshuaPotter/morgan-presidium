export default function(sequelize, DataTypes) {
	return sequelize.define('tags', {
		tag_id: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		tag_title: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: 'tag_title',
		},
	}, {
		sequelize,
		tableName: 'tags',
		timestamps: false,
		indexes: [
			{
				name: 'PRIMARY',
				unique: true,
				using: 'BTREE',
				fields: [
					{ name: 'tag_id' },
				],
			},
			{
				name: 'tag_title',
				unique: true,
				using: 'BTREE',
				fields: [
					{ name: 'tag_title' },
				],
			},
			{
				name: 'tag_id',
				using: 'BTREE',
				fields: [
					{ name: 'tag_id' },
				],
			},
		],
	}, { underscored: true });
}
