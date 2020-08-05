
/* 유저 라우터 */

var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

var {User, Post, Comment} = require('../models');

const {loginCheck} = require('./auth');

/* 회원 정보 (프로필, 팔로워, 팔로잉, 포스팅)*/
router.get('/:id',loginCheck, async(req, res, next) => {
  try{
    var otherUser = await User.findOne({
      where: {
        id: req.params.id
      }
    })
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
      where: {userId: req.params.id},
      order: [['updatedAt','desc']],
    })
    var liking = await Post.findAll({
      include:{
        model: User,
        attributes: ['id'],
        as: 'Likings',
      },
      where: {
        userId: req.params.id
      },
      order: [['updatedAt','desc']],
    })
    var followings = await otherUser.getFollowings();
    var followers = await otherUser.getFollowers();
    var isFollowed = await User.findAll({
      where: {id : req.params.id},
      include: [{
          model:User,
          attributes: ['id', 'nickname'],
          as: 'Followers',
          where: {id: req.user.id}
      }] 
    })
    return res.render('user', {
      user: req.user,
      otherUser,
      posting,
      followers,
      followings,
      isFollowed,
      liking
      });
  }catch(error){
    console.error(error);
    next(error);
  }
});

/* 팔로우 */
router.post('/:id/follow',loginCheck, async (req, res, next) => {
  try{
    const selUser = await User.findOne({where : {id: req.user.id}});
    await selUser.addFollowing(parseInt(req.params.id, 10));
    res.redirect(`/user/${req.params.id}`);
  }catch(error){
    console.error(error);
    next(error);
  }
})

router.post('/:id/unfollow',loginCheck, async (req, res, next) => {
  try{
    const selUser = await User.findOne({where : {id: req.params.id}});
    await selUser.removeFollower(parseInt(req.user.id, 10));
    res.redirect(`/user/${req.params.id}`);
  }catch(error){
    console.error(error);
    next(error);
  }
})

router.get('/:id/followers',loginCheck, async (req, res, next) => {
  try{
    var otherUser = await User.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model:User,
        attributes: ['id', 'nickname','profile'],
        as: 'Followers'
      }
    })
    res.render('followers', {
      user: req.user,
      otherUser
    });
  }catch(error){
    console.error(error);
    next(error);
  }
})

router.get('/:id/followings',loginCheck, async (req, res, next) => {
  try{
    var otherUser = await User.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model:User,
        attributes: ['id', 'nickname','profile'],
        as: 'Followings'
      }
    })
    res.render('followings', {
      user: req.user,
      otherUser
    });
  }catch(error){
    console.error(error);
    next(error);
  }
})

const upload = multer({
  storage: multer.diskStorage({
      destination(req, file, cb){
          cb(null, 'public/profile/');
      },
      filename(req, file, cb){
          const ext = path.extname(file.originalname);
          cb(null, path.basename(file.originalname, ext) + Date.now() +ext);
      }
  }),
  limits: {fileSize: 100 * 1024 * 1024}
});


/* 프로필 변경 AJAX */
router.post('/:id/change',loginCheck, upload.single('img'), async (req, res) => {
  console.log(parseInt(req.params.id));
  console.log(req.user.id);
  if(req.user.id!==parseInt(req.params.id)){
    return res.render('historyback', {msg: '잘못된 접근입니다.'});
  }
  await User.update( {profile: `/profile/${req.file.filename}`}, { where: {id: req.user.id} })
  res.json({ url: `/profile/${req.file.filename}`});
});

/* 게시글 삭제 */
router.post('/:userId/delete/:postId',loginCheck,async (req,res) => {
  if(req.user.id==parseInt(req.params.userId)){
    await Post.destroy({
      where: {
        id: req.params.postId
      }
    });
    res.redirect(`/user/${req.user.id}`);
  }else{
    res.render('historyback', {msg : '잘못된 접근입니다.'});
  }
})


module.exports = router;
