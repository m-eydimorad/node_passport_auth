const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const keys = require('../keys');
const UserModel = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // authentication will take approximately 13 seconds
    // https://pthree.org/wp-content/uploads/2016/06/bcrypt.png
    const hashCost = 10;

    try {
        const passwordHash = await bcrypt.hash(password, hashCost);
        const userDocument = new UserModel({ username, passwordHash });
        userDocument.save();

        res.status(200).send({ username });

    } catch (error) {
        res.status(400).send({
            error: 'req body should take the form { username, password }',
        });
    }
});

router.post('/login', (req, res) => {
    passport.authenticate(
        'local',
        { session: false },
        (error, user) => {
            if (error || !user) {
                res.status(401).json({ error });
                return;
            }
            /** This is what ends up in our JWT */
            const payload = {
                username: user.username,
                role: user.role,
                expires: Date.now() + parseInt(60000),
            };
            /** assigns payload to req.user */
            req.login(payload, { session: false }, (error) => {
                if (error) {
                    res.status(401).send({ error });
                    return;
                }
                /** generate a signed json web token and return it in the response */
                const token = jwt.sign(JSON.stringify(payload), "ABCDEFG");
                /** assign our jwt to the cookie */
                res.cookie('jwt', token, { httpOnly: true, secure: true });
                res.status(200).send({ token });
            });
        },
    )(req, res);
});



module.exports = router;