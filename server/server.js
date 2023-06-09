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

app.post('/createTeam', function (req, res) {
    const { name, school, coach } = req.body;
    db.query(
        `INSERT INTO team(name, school, coach) VALUES ('${name}', '${school}', '${coach}')`,
        function (err, rows, fields) {
            console.log(school);
            if (err) {
                var error_msg = err.code + ": Server Error";
                console.log(error_msg);
                return res.send({ message: error_msg });
            };
            var success_msg = "Created team: " + name;
            return res.send({ message: success_msg });
        }
    )
});

app.post('/createGame', function (req, res) {
    const { host, guest, date } = req.body;
    db.query(
        `INSERT INTO game(host, guest,  date, highlights) VALUES (${host}, ${guest}, '${date}', '')`,
        function (err, rows, fields) {
            console.log(req.body);
            if (err) {
                var error_msg = err.code + ": Server Error";
                console.log(error_msg);
                return res.send({ message: error_msg });
            };
            var success_msg = "Created game";
            return res.send({ message: success_msg });
        }
    )
});

app.post('/createPlayer', function (req, res) {
    const { team, name, position, number } = req.body;
    db.query(
        `INSERT INTO player( team_id, name, position, number, hand, height, weight) VALUES (${team}, '${name}', '${position}','${number}', 'right', 189, 90)`,
        function (err, rows, fields) {
            console.log(team, name, position, number)
            if (err) {
                var error_msg = err.code + ": Server Error";
                console.log(error_msg);
                return res.send({ message: error_msg });
            };
            var success_msg = "Created player: " + name;
            return res.send({ message: success_msg });
        }
    )
});

app.post('/createPlay', function (req, res) {
    db.query(
        `INSERT INTO play(player_id, game_id, type, finish, result, free_throw) VALUES (${req.body.player_id}, ${req.body.game_id}, '${req.body.type}', '${req.body.finish}', '${req.body.result}', '${req.body.free_throw}')`,
        function (err, rows, fields) {
            console.log(req.body);
            if (err) {
                var error_msg = err.code + ": Server Error";
                console.log(error_msg);
                return res.send({ message: error_msg });
            };
            var success_msg = "Created play successfully ";
            return res.send({ message: success_msg });
        }
    )
});

app.get('/getTeams', (request, response) => {
    db.query(
        `SELECT * FROM team`,
        function (err, rows, fields) {
            var teams = getList(rows, 'name');
            var id = getList(rows, 'team_id');
            console.log(teams);
            console.log(id);
            if (rows.length === 0) {
                console.log('No teams found.')
            }
            if (err) {
                var error_msg = err.code + ": Server Error";
                console.log(error_msg);
                return response.send({ message: error_msg });
            };
            return response.send({ data: teams, id: id });
        }
    )
});

app.post("/getPlayersByTeam", function (req, res) {
    const { teamName } = req.body;
    db.query(
        `SELECT * FROM player WHERE team_id= ${ teamName};`,
        // `SELECT * FROM player WHERE team_id= ${ teamName};`,//WHERE team='${team}'
        function (err, rows, fields) {
            var players = getList(rows, 'name');
            var id = getList(rows, 'player_id');
            console.log(teamName);
            console.log(players);
            console.log(id);
            if (rows.length === 0) {
                console.log('No player found.');
            }
            if (err) {
                var error_msg = err.code + ": Server Error";
                console.log(error_msg);
                return res.send({ message: error_msg });
            };
            return res.send({ players: players, id: id });
        }
    );
});

app.post("/getGamesByTeam", function (req, res) {
    db.query(
        `SELECT * FROM game WHERE host = ${req.body.teamName} OR guest  = ${req.body.teamName};`,//WHERE host = ${req.body.teamName} OR guest  = ${req.body.teamName}
        function (err, rows, fields) {
            // console.log(req.body.teamName);
            // console.log(rows);
            var host = getList(rows, 'host');
            var guest = getList(rows, 'guest');
            var id = getList(rows, 'game_id');
            // console.log(type(req.body.teamName));
            if (rows.length === 0) {
                console.log('No game found.');
            }
            if (err) {
                var error_msg = err.code + ": Server Error";
                console.log(error_msg);
                return res.send({ message: error_msg });
            };
            return res.send({host: host, guest: guest, id: id });
        }
    );
});

app.get('/getGamesQuery', (request, response) => {
    db.query(
        `SELECT * FROM game`,
        function (err, rows) {
            console.log(rows);
            return response.send({ data: rows });
        }
    )
});

app.get('/getTeamsQuery', (request, response) => {
    db.query(
        `SELECT * FROM team`,
        function (err, rows) {
            console.log(rows);
            return response.send({ data: rows });
        }
    )
});

app.get('/getPlayersQuery', (request, response) => {
    db.query(
        `SELECT * FROM player`,
        function (err, rows) {
            console.log(rows);
            return response.send({ data: rows });
        }
    )
});

app.post('/searchTeam', function (request, response) {
    const { teamName} = request.body;
    db.query(
        `SELECT P.game_id, Pr.team_id, Pr.name, P.type, P.finish, P.result, P.free_throw
        FROM play as P, player as Pr, team as T
        WHERE P.player_id = Pr.player_id and Pr.team_id = T.team_id and T.team_id  =${teamName};`,
        function (err, rows, fields) {
            // if (rows.length === 0) {
            //     console.log('查無球隊資料，請檢察拼字是否正確');
            // }
            console.log(request.body);
            if (err) {
                var error_msg = err.code + ": Server Error";
                console.log(error_msg);
                return response.send({ message: error_msg });
            };
            var obj = JSON.parse(JSON.stringify(rows));
            var values = [];
            for (let i = 0; i < obj.length; i++) {
                values.push(obj[i]);
            }
            return response.send({ data: values });
        }
    );
});

app.post('/searchPlayer', function (request, response) {
    const { player_id } = request.body;
    db.query(
        `SELECT P.game_id, Pr.team_id, Pr.name, P.type, P.finish, P.result, P.free_throw
        FROM play as P, player as Pr
        WHERE P.player_id = Pr.player_id and Pr.player_id = ${player_id}`,
        function (err, rows, fields) {
            console.log(request.body);
            // if (rows.length === 0) {
            //     console.log('No data found.')
            // }
            if (err) {
                var error_msg = err.code + ": Server Error";
                console.log(error_msg);
                return response.send({ message: error_msg });
            };
            var obj = JSON.parse(JSON.stringify(rows));
            var values = [];
            for (let i = 0; i < obj.length; i++) {
                values.push(obj[i]);
            }
            return response.send({ data: values });
        }
    );
});