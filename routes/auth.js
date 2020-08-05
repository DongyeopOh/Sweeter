exports.loginCheck = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/login');
    }
}

exports.userRedirect = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
}