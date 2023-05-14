const express = require("express");
const router = express.Router();
const {Op} = require('sequelize');
const Fornecedor = require("./Fornecedor");
const adminAuth =require("../middlewares/adminAuth");

router.get("/admin/fornecedores", adminAuth, (req, res) =>{
    Fornecedor.findAll({
        order: [["nomeFantasia", "DESC"]]
    })        
    .then(fornecedores =>{
        res.render("admin/fornecedores/index", { fornecedores: fornecedores })
    })
    .catch(err => res.redirect("/"));
    
});

router.get("/admin/fornecedor/create", (req, res)=>{
    res.render("admin/fornecedores/new");
})

router.post("/admin/fornecedor/save", (req, res)=>{
    let nomeFantasia = req.body.nomeFantasia;
    let razaoSocial = req.body.razaoSocial;
    let cnpj = req.body.cnpj;
    let email = req.body.email;
    let fone = req.body.fone;
   
    Fornecedor.findOne({
        where:{
           cnpj:cnpj
        }
    }
    ).then(fornecedor =>{
        if(fornecedor){
            res.redirect("/admin/fornecedor/create")
        }else{
            Fornecedor.create({
                nomeFantasia: nomeFantasia,
                razaoSocial : razaoSocial,
                cnpj: cnpj,
                fone: fone,
                email:email,
                
            })
            .then(()=> res.redirect("/admin/fornecedores"))
            .catch(err=> res.redirect("/"));
        }

    })
});

router.get('/admin/fornecedor/busca', async (req, res) => {
    const searchText = req.query.text;
  
    try {
      const fornecedores = await Fornecedor.findAll({
        where: {
          nomeFantasia: {
            [Op.like]: `%${searchText}%`
          }
        }
      });
  
      res.render("admin/fornecedores/index", {fornecedores : fornecedores})
    } catch (error) {
    console.log(error)
      res.redirect("/admin/fornecedores");
    }
});
router.get("/admin/fornecedor/view/:id", adminAuth, (req, res)=>{
    let id = req.params.id;

    Fornecedor.findOne({
        where:{
            id: id
        }
    })
    .then(fornecedor=>{
        res.render("admin/fornecedores/view", { fornecedor: fornecedor})
    })
});

router.get("/admin/fornecedor/edit/:id", adminAuth, (req, res)=>{
    let id = req.params.id;

    Fornecedor.findOne({
        where:{
            id: id
        }
    })
    .then(fornecedor=>{
        res.render("admin/fornecedores/edit", { fornecedor: fornecedor})
    })
});

router.post("/admin/fornecedor/update/:id", adminAuth, (req, res)=>{
    let id =req.params.id;
    let nomeFantasia = req.body.nomeFantasia;
    let razaoSocial = req.body.razaoSocial;
    let cnpj = req.body.cnpj;
    let email = req.body.email;
    let fone = req.body.fone;
    
    if(!isNaN(id)){
       Fornecedor.update(
        {
            nomeFantasia: nomeFantasia,
            razaoSocial : razaoSocial,
            cnpj: cnpj,
            fone: fone,
            email:email,
        
        }, 
        {
        where:{ id: id }
        }
        ).then(fornecedor=>{
            if(fornecedor){
                res.redirect("/admin/fornecedores");
            }else{
                res.redirect("/admin/fornecedor/edit/"+id);
             }
            }).catch(err=>{
                res.redirect("/admin/fornecedor/edit/"+id);
            });
    }else{
       res.redirect("/admin/fornecedor/edit/"+id);
    }
});

router.post("/admin/fornecedor/delete/:id", adminAuth, (req, res)=>{
    let id = req.params.id;

    if(!isNaN(id)){
        Fornecedor.destroy({
            where:{
                id: id
            }
        })
        .then( fornecedor =>{
            res.redirect("/admin/fornecedor");
        })
        .catch(err =>{
            res.redirect("/admin/fornecedores");
            console.log("An error occurs when try to delete fornecedor: ", err);
        });
    }else{
        res.redirect("/admin/fornecedores");
    }
});



module.exports = router;