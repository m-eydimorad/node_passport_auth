const passport = require('passport');
exports.jwtAuthenticate = () => {
    return passport.authenticate('jwt', { session: false })
}