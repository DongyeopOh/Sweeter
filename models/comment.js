module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment',{
        comment: {
            type: DataTypes.STRING(300),
            allowNull: false
        }
    },{
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}