const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const bcrypt = require('bcrypt');

const UserModel = require('./models/user');

passport.use(new JWTStrategy({
    jwtFromRequest: req => {
        return req.headers.jwt;
    },
    secretOrKey: "ABCDEFG",
},
    (jwtPayload, done) => {

        if (Date.now() > jwtPayload.expires) {

            return done('token expired');
        }
        return done(null, jwtPayload);
    }
));
passport.use(new LocalStrategy({ usernameField: "email" },
    async (email, password, done) => {
        UserModel.findOne({ email: email }, async (error, user) => {
            if (error) {
                return done('Error occurred in get user')
            }
            const userDocument = user;
            if (!userDocument) {
                return done('User not found')
            }
            const passwordsMatch = await bcrypt.compare(password, userDocument.passwordHash);
            if (passwordsMatch) {
                return done(null, userDocument);
            } else {
                return done('Incorrect Email / Password');
            }
        });



    }));

module.exports = {}