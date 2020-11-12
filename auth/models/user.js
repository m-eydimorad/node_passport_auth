// const mongoose = require('mongoose');
// const { Schema } = mongoose;
let users = [];
class userSchema {
    constructor(user) {
        this.username = user.username;
        this.passwordHash = user.passwordHash;
        this.role = "basic"
    }
    save() {
        users.push({ username: this.username, passwordHash: this.passwordHash, role: this.role })
    }
    static findOne(query) {
        return users.find(a => a.username.toLowerCase() == query.username.toLowerCase())
    }
    static find() {
        return users;
    }
}

const User = userSchema;
module.exports = User;