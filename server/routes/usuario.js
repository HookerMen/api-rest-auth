const express = require('express');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const { getUsers, addUser, updateUser, deleteUser } = require("../controllers/usuario")
const app = express();


app.get('/usuario', verificaToken, (req, res) => {
    getUsers()
        .then(success => res.status(200).send(success))
        .catch( err => res.status(400).send( { error: err.message } ) )
});

app.post('/usuario', [verificaToken, verificaAdmin_Role], function(req, res) {
    let {nombre, email, password, role, estado} = req.body
    addUser(nombre,email,password,role, estado)
        .then(success => res.status(200).send(success))
        .catch( err => res.status(400).send( { error: err.message } ) )
});

app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {
    let id = req.params.id
    let {nombre, email, password, role} = req.body

    updateUser(id, nombre,email,password,role)
        .then(success => res.status(200).send(success))
        .catch( err => res.status(400).send( { error: err.message } ) )

});

app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {
    let id = req.params.id;
    deleteUser(id)
        .then(success => res.status(200).send(success))
        .catch( err => res.status(400).send( { error: err.message } ) )
});

module.exports = app;

