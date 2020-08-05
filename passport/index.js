var local = require('./localStrategy');
var kakao = require('./kakaoStrategy');
var {User} = require('../models');

module.exports = (passport) => {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });

    passport.deserializeUser(function(id, done) {
        User.findOne({
            where: {id},
            include: [{
                model:User,
                attributes: ['id', 'nickname'],
                as: 'Followers'
            },{
                model: User,
                attributes: ['id', 'nickname'],
                as: 'Followings',
            }] 
        })
            .then(user => done(null,user))
            .catch(err => done(err))
    });

    local(passport);
    kakao(passport);
}