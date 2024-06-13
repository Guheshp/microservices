module.exports = (sequelize, DataTypes) => {
    const UserPermission = sequelize.define("UserPermission", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        permission: {
            type: DataTypes.STRING,
            defaultValue: '[]'

        }
    }, {
        tableName: 'user_permissions', // Optionally specify table name
        timestamps: false // Since this is a linking table, you may not need timestamps
    });

    return UserPermission;
};
