const { urlencoded } = require("body-parser");
const express = require("express");
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

//Database
connection.authenticate()
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
