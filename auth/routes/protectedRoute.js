const express = require('express');
const router = express.Router();
const roles = require('../roles')
const UserModel = require('../models/user')

const jwtMiddleware = require('../middlewares/jwtMiddleware')

router.get('/protected',
    jwtMiddleware.jwtAuthenticate(), roles.grantAccess('readOwn', 'profile'),
    (req, res) => {
        const { user } = req;

        res.status(200).send({ user });
    });

router.get('/protectedadmin',
    jwtMiddleware.jwtAuthenticate(), roles.grantAccess('readAny', 'profile'),
    (req, res) => {
        UserModel.findAll(function (err, users) {
            res.status(200).send(users);
        });

    });

module.exports = router