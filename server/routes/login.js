const express = require('express');
const app = express();
let {loginUser} = require("../controllers/usuario")

app.post('/login', (req, res) => {

    let {email, password} = req.body;
    loginUser(email, password)
        .then(success =>  res.status(200).send({token:success}) )
        .catch( err => res.status(400).send( { error: err.message } ) )
});

module.exports = app;

