// const mongoose = require('mongoose');
// const { Schema } = mongoose;
let users = [];
class userSchema {
    constructor(user) {
        this.username = user.username;
        this.passwordHash = user.passwordHash;
        this.role = "admin"
    }
    save() {
        users.push({ username: this.username, passwordHash: this.passwordHash, role: this.role })
    }
    static findOne(query) {
        return users.find(a => a.username == query.username)
    }
    static find() {
        return users;
    }
}

const User = userSchema;
module.exports = User;