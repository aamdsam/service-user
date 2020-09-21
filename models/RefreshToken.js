module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define('RefreshToken', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            fields: 'created_at',
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            fields: 'udpdated_at',
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'refresh_token',
        timestamps: true
    });

    return RefreshToken;
}