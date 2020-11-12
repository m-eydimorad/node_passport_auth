
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth/authSetup')
const cors = require('cors');


// var corsOptions = {
//     origin: 'http://localhost:5000',
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//     credentials: true
// }


const app = express();
app.use(bodyParser.json());
app.use(cors())
const PORT = process.env.PORT || 3010;

auth.setup(app);
app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT)
})
