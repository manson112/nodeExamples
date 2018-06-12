module.exports = function(sequelize, DataTypes) {
    const Label = sequelize.define('Label', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        }
    });
    return Label;
};