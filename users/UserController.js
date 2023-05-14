const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const adminAuth =require("../middlewares/adminAuth");

router.get("/admin/users", adminAuth, (req, res) =>{
    User.findAll({
        order: [["id", "DESC"]]
    })        
    .then(users =>{
        res.render("admin/users/index", { users: users })
    })
    .catch(err => res.redirect("/"));
    
});

router.get("/admin/user/create", (req, res)=>{
    res.render("admin/users/new");
})

router.post("/admin/user/save", (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
        where:{
            email:email
        }
    }
    ).then(user =>{
        if(user){
            res.redirect("/admin/user/create")
        }else{
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
            User.create({
                email:email,
                password: hash
            })
            .then(()=> res.redirect("/admin/users"))
            .catch(err=> res.redirect("/"));
        }

    })
});

router.get("/admin/user/edit/:id", adminAuth, (req, res)=>{
    let id = req.params.id;

    User.findOne({
        where:{
            id: id
        }
    })
    .then(user=>{
        res.render("admin/users/edit", { user: user})
    })
});

router.post("/admin/user/update/:id", adminAuth, (req, res)=>{
    let id =req.params.id;
    let email = req.body.email;
    let password = req.body.password;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt)
    
 
    if(!isNaN(id)){
       User.update(
        {
        email:email, 
        password:  hash
        
        }, 
        {
        where:{ id: id }
        }
        ).then(user=>{
            if(user){
                res.redirect("/admin/users");
            }else{
                res.redirect("/admin/user/edit/"+id);
             }
            }).catch(err=>{
                res.redirect("/admin/user/edit/"+id);
            });
    }else{
       res.redirect("/admin/user/edit/"+id);
    }
});

router.post("/admin/user/delete/:id", adminAuth, (req, res)=>{
    let id = req.params.id;

    if(!isNaN(id)){
        User.destroy({
            where:{
                id: id
            }
        })
        .then( user =>{
            res.redirect("/admin/users");
        })
        .catch(err =>{
            res.redirect("/admin/users");
            console.log("An error occurs when try to delete user: ", err);
        });
    }else{
        res.redirect("/admin/users");
    }
});

router.get("/login", (req, res)=>{
    res.render("admin/users/login", {erro:''});
});

router.post("/authenticate", (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({
        where:{
            email:email
        }
    }).then(user=>{
        if(user){
            let correct = bcrypt.compareSync(password, user.password);
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                };
                res.render("index");
            }else{
                res.render("admin/users/login", {erro: "Usuário e/ou senha incorretos"});
            }
        }else{
            res.render("admin/users/login", {erro: "Usuário e/ou senha incorretos"});
        }
    })
});

router.get("/logout", (req, res)=>{
    req.session.user = null;
    res.redirect("/");
});

module.exports = router;