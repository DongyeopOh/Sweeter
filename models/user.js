module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        email: {
            type: DataTypes.STRING(30),
            allowNull: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        profile: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: '/profile/default.jpg'
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'local'
        },
        snsId: {
            type: DataTypes.STRING(30),
            allowNull: true
        }
    },{
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}