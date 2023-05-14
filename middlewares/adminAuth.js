 const adminAuth = (req, res, next) => {
    
    if(req.session.user){
        next();
    }else{
        res.render("admin/users/login", {erro: ''});
    }
}

module.exports = adminAuth;