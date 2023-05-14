const Sequelize = require("sequelize");
const connection = require("../database/database");

const Aluno = connection.define("tb_alunos",{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    matricula:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    fone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
});

Aluno.sync();
module.exports = Aluno;