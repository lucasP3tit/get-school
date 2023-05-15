const { urlencoded } = require("body-parser");
const bcrypt = require("bcryptjs");
const express = require("express");
const User = require("./users/User");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const usersRoutes = require("./users/UserController");
const alunosRoutes = require("./alunos/AlunosController");
const fornecedoresRoutes = require("./fornecedores/FornecedorController");
const session = require("express-session");
const adminAuth = require("./middlewares/adminAuth");

//View Engine
app.set("view engine", "ejs");

//Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Static
app.use(express.static("public"));

//Sessions
app.use(session({
    secret:"jahjdhsadjahsd",
    cookie:{
        maxAge: 3000000
    }
}));

//Cria usuario admin
let email = "admin@admin.com";
let password = "admin123"
User.findOne({
    where:{
    email:email
    }
})
.then(user =>{
    if(user){
        console.log("Usuário admin já se encontra criado.")
    }else{
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        User.create({
            email:email,
             password: hash
         })
        .then(()=> console.log("Usuário admin criado"))
        .catch(console.log("Erro ao criar usuário admin"));
    }
});

//Database
connection
    .authenticate()
    .then(()=>{console.log("Database connected")})
    .catch(err=>console.log("Database connection error: ", err));

//Routers
app.use("/", 
    [
        usersRoutes,
        alunosRoutes,
        fornecedoresRoutes
    ]
)

//Routes
app.get("/", adminAuth, (req, res)=>{
    res.render("index");
})

//Server
app.listen(8081, ()=>{
    console.log("Server Running");
});
