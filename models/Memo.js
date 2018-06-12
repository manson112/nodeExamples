module.exports = function(sequelize, DataTypes) {
    const Memo = sequelize.define('Memo', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        body: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        //timestamps: false,
        tableName: 'Memo'
    });
    return Memo;
}

// module.exports = function(sequelize, DataTypes) {
//     var _yourTableName = sequelize.define('모델명', { /* 특성 */ }, { /* 옵션 */ });
//     return _yourTableName;
// };