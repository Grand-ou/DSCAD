const mysql = require("mysql");

// connect MySQL
var connection = mysql.createConnection({
<<<<<<< HEAD
    host: "dscad.cd3i2qz10lhh.us-east-1.rds.amazonaws.com",
=======
    host: "dscad-cluster.cluster-cd3i2qz10lhh.us-east-1.rds.amazonaws.com",
>>>>>>> 78973363bd1faeea382d53c5ca85c185373a07fa
    user: "dscad",
    password: "11111111",
    database: "dscad_schema",
    port:3306,
});

module.exports = connection;
