
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth/authSetup')



const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3010;

auth.setup(app);
app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT)
})
