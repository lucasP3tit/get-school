const Sequelize = require("sequelize");

const connection = new Sequelize(
    "getschool",
    "sa",
    "abcd=1234",
    {
        host:"localhost",
        dialect: "mssql",
        port:1433
    }

);

module.exports = connection;