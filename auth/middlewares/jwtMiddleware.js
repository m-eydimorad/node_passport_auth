const passport = require('passport');
// exports.jwtAuthenticate = function () {
//     return (req, res) => {

//         passport.authenticate('jwt', { session: false })
//     }
// }


exports.jwtAuthenticate = function () {
    return (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (error, user) => {
            if (error) {
                res.status(401).json({ error });
                return;
            }
            req.login(user, { session: false });
            next()
        })(req, res, next);
    };
}