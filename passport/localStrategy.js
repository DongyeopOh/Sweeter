var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password'
    }, async(email, password, done) => {
        try{
            var result = await User.findOne({ where: {email} });
            if(!result){
                done(null, false, {message: '가입되지 않은 회원입니다.'});
            }
            var compare = await bcrypt.compare(password, result.password);
            if(!compare){
                done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
            }
            done(null, result);
        }catch(error){
            console.error(error);
            done(error);
        }
    }))
}