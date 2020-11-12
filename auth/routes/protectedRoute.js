const express = require('express');
const router = express.Router();
const roles = require('../roles')

const jwtMiddleware = require('../middlewares/jwtMiddleware')

router.get('/protected',
    jwtMiddleware.jwtAuthenticate(),
    (req, res) => {
        const { user } = req;

        res.status(200).send({ user });
    });

router.get('/protectedadmin',
    jwtMiddleware.jwtAuthenticate(), roles.grantAccess('readAny', 'profile'),
    (req, res) => {
        const { user } = req;

        res.status(200).send({ user });
    });

module.exports = router