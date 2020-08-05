const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const {User, Post, Comment, Hashtag} = require('../models');
const passport = require('passport');

const sequelize = require("sequelize");
const Op = sequelize.Op;

const {loginCheck, userRedirect} = require('./auth');

/* 메인 타임라인 */
router.get('/', loginCheck, async (req, res, next) => {
  try{
    var str = new Array();
    for(var i = 0; i < req.user.Followings.length ; i++){
      str[i]=req.user.Followings[i].id;
    }
    str.push(req.user.id);

    var posting = await Post.findAll({
      include:[{
        model: User,
        attributes: ['id', 'nickname', 'profile']
      },{
        model: User,
        attributes: ['id'],
        as: 'Likings',
        where:{
          id:req.user.id
        },
        required:false
      },{
        model: User,
        attributes: ['id'],
        as: 'Likings',
      },{
        model: Comment,
      }],
      where: {
        userId : str
      },
      order: [['updatedAt','desc']],
    })
    var liking = await Post.findAll({
      include:{
        model: User,
        attributes: ['id'],
        as: 'Likings',
      },
      where: {
        userId : str
      },
      order: [['updatedAt','desc']],
    })
    return res.render('index', { 
      title: 'Sweeter' ,
      user: req.user,
      posting,
      liking
      });
  }catch(error){
    console.error(error);
    next(error);
  }
});


/* 좋아요 AJAX */
router.get('/:postId/like',loginCheck, async (req, res, next) => {
  try{
    console.log('welcome');
    const selPost = await Post.findOne({where : {id: req.params.postId}});
    const result = await selPost.addLiking(parseInt(req.user.id, 10));
    res.json({result});
  }catch(error){
    console.error(error);
    next(error);
  }
})
router.get('/:postId/unlike',loginCheck, async (req, res, next) => {
  try{
    const selUser = await User.findOne({where : {id: req.user.id}});
    const result = await selUser.removeLiked(parseInt(req.params.postId, 10));
    res.json({result});
  }catch(error){
    console.error(error);
    next(error);
  }
})

/* 회원 가입 */
router.get('/join',userRedirect, (req, res, next) => {
  res.render('join');
})

router.post('/join',userRedirect, async (req, res, next) => {
  var {email, password, nickname} = req.body;
  try{
    var result = await User.findOne({ where: {email} })
    if(result){
      return res.render('historyback', {msg: '이미 존재하는 이메일입니다.'});
    }
    var hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      password: hash,
      nickname
    })
    await passport.authenticate('local',(authError, user, info) => {
      if(authError){
        console.error(authError);
        return next(authError);
      }
      if(!user){
        return res.render('historyback', {msg: info.message});
      }
      return req.login(user, (loginError) => {
        if(loginError){
          console.error(loginError);
          return next(loginError);
        }
        return res.redirect('/');
      });
    })(req, res, next);
  }catch(error){
    console.error(error);
    next(error);
  }
})

/* 로그인 */
router.get('/login',userRedirect, (req, res, next) => {
  res.render('login');
})

router.post('/login',userRedirect, (req, res, next) => {
  passport.authenticate('local',(authError, user, info) => {
    if(authError){
      console.error(authError);
      return next(authError);
    }
    if(!user){
      return res.render('historyback', {msg: info.message});
    }
    return req.login(user, (loginError) => {
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao',{
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

/* 검색창 AJAX */
router.post('/reco', async (req, res, next) => {
  if(req.user){
    var input = req.body.search;
    if(input){
      var resultUser = await User.findAll({
        where: {
          nickname: {
            [Op.like] : "%" + input + "%"
          }
        }
      });
      res.json({resultUser});
    }
  }
})

/* 댓글 */
router.post('/showComment',loginCheck, async(req,res,next) => {
  try{
    const comment = await Comment.findAll({
      where:{
        postId :req.body.postId
      },
      include: {
        model: User,
        attributes: ['nickname']
      }
    })
    res.json({comment});
  }catch(error){
    console.error(error);
    next(error);
  }
})

router.post('/comment',loginCheck, async (req,res,next) => {
  if(req.user){
    try{
        const comment = await Comment.create({
            comment: req.body.comment,
            postId: req.body.postId,
            userId: req.user.id
        });
        res.json({comment, nickname: req.user.nickname})
    }catch(error){
        console.error(error);
        next(error);
    }
  }else{
      res.redirect('/login');
  }
})

/* 검색결과 */
router.post('/search',loginCheck, async (req, res, next) => {
    var keyword = req.body.keyword;
    var userResult = await User.findAll({
      where:{
        nickname : {
          [Op.like] : "%" + keyword + "%"
        }
      }
    })
    var postResult = await Post.findAll({
      include:[{
        model: User,
        attributes: ['id', 'nickname', 'profile']
      },{
        model: User,
        attributes: ['id'],
        as: 'Likings',
      },{
        model: Comment,
      },{
        model: Hashtag,
        where:{
          title: keyword
        }
      }],
      order: [['updatedAt','desc']],
    })
    var liking = await Post.findAll({
      include:[{
        model: User,
        attributes: ['id'],
        as: 'Likings',
      },{
        model: Hashtag,
        where:{
          title: keyword
        }
      }],
      order: [['updatedAt','desc']],
    })
    res.render('search', {
      keyword,
      user: req.user,
      userResult,
      postResult,
      liking
    });
})


/* 댓글 삭제 AJAX */
router.post('/deleteComment/:commentId', loginCheck, async (req, res, next) => {
  var result = await Comment.destroy({where:{
    id: req.params.commentId
  }})
  res.json({result});
})
module.exports = router;