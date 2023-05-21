const mysql = require("mysql");

// connect MySQL
var connection = mysql.createConnection({
    host: "dscad.cd3i2qz10lhh.us-east-1.rds.amazonaws.com",
    user: "dscad",
    password: "11111111",
    database: "dscad_schema",
    port:3306,
});

module.exports = connection;