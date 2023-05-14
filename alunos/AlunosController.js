const express = require("express");
const router = express.Router();
const {Op} = require('sequelize');
const Aluno = require("./Alunos");
const bcrypt = require("bcryptjs");
const adminAuth =require("../middlewares/adminAuth");

router.get("/admin/alunos", adminAuth, (req, res) =>{
    Aluno.findAll({
        order: [["nome"]]
    })        
    .then(alunos =>{
        res.render("admin/alunos/index", { alunos: alunos })
    })
    .catch(err => res.redirect("/"));
    
});

router.get("/admin/aluno/create", adminAuth, (req, res)=>{
    res.render("admin/alunos/new");
})

router.post("/admin/aluno/save", (req, res)=>{
    let nome = req.body.nome;
    let fone = req.body.fone;
    let matricula = req.body.matricula
    let email = req.body.email;

    Aluno.findOne({
        where:{
            email:email,    
            matricula: matricula
        }
    }
    ).then(aluno =>{
        if(aluno){
            res.redirect("/admin/aluno/create")
        }else{
            Aluno.create({
                nome: nome,
                fone:fone,
                matricula: matricula,
                email:email,
            })
            .then(()=> res.redirect("/admin/alunos"))
            .catch(err=> res.redirect("/"));
        }

    })
});

router.get('/admin/aluno/busca', async (req, res) => {
    const searchText = req.query.text;
  
    try {
      const alunos = await Aluno.findAll({
        where: {
          nome: {
            [Op.like]: `%${searchText}%`
          }
        }
      });
  
      res.render("admin/alunos/index", {alunos : alunos})
    } catch (error) {
    console.log(error)
      res.redirect("/admin/alunos");
    }
});

router.get("/admin/aluno/view/:id", adminAuth, (req, res)=>{
    let id = req.params.id;

    Aluno.findOne({
        where:{
            id: id
        }
    })
    .then(aluno=>{
        res.render("admin/alunos/view", { aluno: aluno})
    })
});

router.post("/admin/aluno/update/:id", adminAuth, (req, res)=>{
    let id =req.params.id;
    let nome = req.params.nome;
    let matricula = req.params.matricula;
    let fone = req.params.fone;
    let email = req.body.email;

    if(!isNaN(id)){
       Aluno.update(
        {
            nome:nome,
            matricula:matricula,
            fone: fone,
            email:email, 
        }, 
        {
            where:{ id: id }
        }
        ).then(aluno=>{
            if(aluno){
                res.redirect("/admin/alunos");
            }else{
                res.redirect("/admin/aluno/edit/"+id);
             }
            }).catch(err=>{
                res.redirect("/admin/aluno/edit/"+id);
            });
    }else{
       res.redirect("/admin/aluno/edit/"+id);
    }
});

router.post("/admin/aluno/delete/:id", adminAuth, (req, res)=>{
    let id = req.params.id;

    if(!isNaN(id)){
        Aluno.destroy({
            where:{
                id: id
            }
        })
        .then( aluno =>{
            res.redirect("/admin/alunos");
        })
        .catch(err =>{
            res.redirect("/admin/alunos");
            console.log("Um erro ocorreu ao deletar o aluno: ", err);
        });
    }else{
        res.redirect("/admin/alunos");
    }
});

module.exports = router;