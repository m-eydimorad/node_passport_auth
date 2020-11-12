var dbConn = require('../config/db.config').dbConn1;

class userSchema {
    constructor(user) {
        this.email = user.email;
        this.passwordHash = user.passwordHash;
        this.role = user.role
    }
    static Create(user, result) {
        dbConn.query("INSERT INTO users set ?", user, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, 'Error');
            }
            else {
                result(null, res.insertId);
            }
        });
    }
    static findOne(query, result) {
        dbConn.query("SELECT * FROM users WHERE email = ? limit 1", [query.email], function (err, res) {
            if (err) {
                console.error("error: ", err);
                result(err, 'Error');
            }
            else {
                result(null, res[0]);
            }
        });
    }
    static findAll(result) {
        dbConn.query("SELECT * FROM users", function (err, res) {
            if (err) {
                console.error("error: ", err);
                result(err, 'Error');
            }
            else {
                result(null, res);
            }
        });
    }
}

const User = userSchema;
module.exports = User;