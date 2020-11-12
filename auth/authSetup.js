require('./passportSetup')
let protected = require('./routes/protectedRoute')
let registerRoutes = require('./routes/passportLoginRegister')

exports.setup = (app) => {
    app.use("/", registerRoutes)
    app.use("/", protected)
}

