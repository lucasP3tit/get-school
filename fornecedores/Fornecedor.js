const Sequelize = require("sequelize");
const connection = require("../database/database");

const Fornecedor = connection.define("tb_fornecedores",{
   razaoSocial:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nomeFantasia:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cnpj:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    fone:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Fornecedor.sync();
module.exports = Fornecedor;