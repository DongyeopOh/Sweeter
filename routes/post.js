
/* 게시글 작성관련 라우터 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {Post, Hashtag} = require('../models');

const router = express.Router();
fs.readdir('public/uploads', (error) => {
    if(error){
        console.error('uploads 폴더가 없어 uploads폴더를 생성합니다.');
        fs.mkdirSync('public/uploads');
    }
});

const {loginCheck} = require('./auth');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'public/uploads/');
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() +ext);
        }
    }),
    limits: {fileSize: 100 * 1024 * 1024}
});

router.post('/img', loginCheck, upload.single('img'), (req, res)=> {
    res.json({ url: `/uploads/${req.file.filename}`});
});

const upload2 = multer();
router.post('/',loginCheck, upload2.none(), async (req, res, next) => {
    if(req.user){
        try{
            const post = await Post.create({
                content: req.body.postarea,
                img: req.body.url,
                userId: req.user.id
            });
            const hashtags = req.body.postarea.match(/#[^\s#]*/g);
            if(hashtags){
                const result = await Promise.all(hashtags.map(tag=> Hashtag.findOrCreate({
                    where:{title: tag.slice(1).toLowerCase()}
                })));
                await post.addHashtags(result.map(r=> r[0]));
            }
            res.redirect('/');
        }catch(error){
            console.error(error);
            next(error);
        }
    }else{
        res.redirect('/login');
    }
});

module.exports = router;
