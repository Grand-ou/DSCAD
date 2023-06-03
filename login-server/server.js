const cors = require('cors');
const express = require("express");
const db = require('./config/db');
const bodyParser = require('body-parser')
const app = express();
const port = 80;

// Database connection
db.connect();
db.query('SELECT * FROM team;', function(err, rows, fields) {
    if (err) throw err;
    console.log('連線成功');
}); 

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(port, () => {
    console.log(`RUN http://localhost:${port}`);
});

const getList = ((rows, cname,) => {
    // get list of values of a column from RowDataPacket
    var obj = JSON.parse(JSON.stringify(rows));
    var values = [];
    for (let i = 0; i < obj.length; i++) {
        values.push(obj[i][cname]);
    }
    return values;
});

app.get("/test", function (req, res) {
    return res.status(200).send({ message: 'Hello Wolrd!' });
});

app.post("/signin", function (req, res) {
    const { username, password } = req.body;
    if (username && password) {
        db.query(
            `SELECT * FROM account WHERE username='${username}' AND password='${password}'`,
            function (err, rows, fields) {
                console.log(getList(rows, 'username'));
                if (rows.length === 0) {
                    console.log('ACCOUNT_NOT_EXIST');
                    return res.send({ message: 'ACCOUNT_NOT_EXIST' });
                };
                console.log('LOGIN_SUCCESSFULLY');
                return res.send({ message: 'LOGIN_SUCCESSFULLY' });
            }
        );
    }
});

app.post("/signup", function (req, res) {
    const { username, password, confirm_password } = req.body;
    if(username && password && confirm_password) {
        db.query(
            `INSERT INTO account(username, password) VALUES ('${username}', '${password}')`,
            function (err, rows, fields) {
                if (err) {
                    console.log(err.code);
                    return res.send({ message: "ACCOUNT_ALREADY_EXISTS" });
                };

                if (password !== confirm_password) {
                    return res.send({ message: "兩次密碼輸入不一致！" });
                } else {
                    console.log("REGISTER_SUCCESSFULLY");
                    return res.send({ message: "REGISTER_SUCCESSFULLY" });
                }
            }
        );
    }
});