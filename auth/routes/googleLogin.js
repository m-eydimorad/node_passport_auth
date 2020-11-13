const axios = require('axios');
const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
exports.google = function (req, res) {
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
        client_id: '441069277278-f8f4n9s34ob0gr4bbunvimov2kr5cfuu.apps.googleusercontent.com',
        client_secret: 'LBaRwBzQG7DVNpyk_f68lHJ8',
        redirect_uri: 'postmessage',
        grant_type: 'authorization_code',
        code: req.body.authCode,
        access_type: 'offline'
    });
    var config = {
        method: 'post',
        url: 'https://oauth2.googleapis.com/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            axios.get('https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + response.data.access_token).then(userData => {
                UserModel.findOne({ email: userData.data.email }, async (error, user) => {
                    if (error) {
                        res.status(401).send({ error: 'Error occurred in get user' })
                        return;
                    }
                    const userDocument = user;
                    if (!userDocument) {
                        res.status(401).send({ error: 'User not found' })
                        return;
                    }

                    const payload = {
                        email: userDocument.email,
                        role: userDocument.role,
                        expires: Date.now() + parseInt(120000),
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

                });
            }).catch(function (error) {
                console.log(error);
                res.send(error)
            });;

        })
        .catch(function (error) {
            console.log(error);
            res.send(error)
        });

};