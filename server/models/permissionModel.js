module.exports = (sequelize, DataTypes) => {
    const PermissionModel = sequelize.define("PermissionModel", {
        permission_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_default: {
            type: DataTypes.INTEGER,
            defaultValue: 0 // Default value set to 0
        }
    }, {
        tableName: 'permissionmodel', // Optionally specify table name
        timestamps: false // Since this is a linking table, you may not need timestamps
    });

    return PermissionModel;
};
