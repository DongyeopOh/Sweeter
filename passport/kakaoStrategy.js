const KakaoStrategy = require('passport-kakao').Strategy;

const {User} = require('../models');

module.exports = (passport) => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        try{
            console.log(profile._json.kakao_account);
            const exUser = await User.findOne({ where: { snsId: profile.id, provider: 'kakao' } });
            if(exUser){
                done(null, exUser);
            }else{
                const newUser = await User.create({
                    nickname: profile.displayName,
                    snsId: profile.id,
                    profile: profile._json.properties.profile_image,
                    provider: 'kakao',
                });
                done(null,newUser);
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }))
}