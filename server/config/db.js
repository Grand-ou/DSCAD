const mysql = require("mysql");

// // connect MySQL
// var connection = mysql.createConnection({
//     host: "dscad.cd3i2qz10lhh.us-east-1.rds.amazonaws.com",
//     user: "dscad",
//     password: "11111111",
//     database: "dscad_schema",
//     port:3306,
// });
// module.exports = connection;
const con = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "dscad",
    password: "11111111",
    database: "dscad_schema",
    debug: false
  });
  
con.on("connection", connection => {
console.log("Database connected!");

connection.on("error", err => {
        console.error(new Date(), "MySQL error", err.code);
    });

    connection.on("close", err => {
        console.error(new Date(), "MySQL close", err);
    });
});
module.exports = con;
