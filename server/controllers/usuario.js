const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const getUsers = async () => Usuario.find({ estado: true }, 'nombre email role estado img').exec();

const addUser = async (nombre, email, password, role) => {
    let user = new Usuario({ nombre, email, password: bcrypt.hashSync(password, 10), role });
    return user.save()
}

const updateUser = async (_id, nombre, email, password, role, estado) => {
    let userUpdate = new Usuario({ _id, nombre, email, password: bcrypt.hashSync(password, 10), role, estado });
    return Usuario.findByIdAndUpdate(_id, userUpdate, { new: true, runValidators: true })
}

const deleteUser = async (_id) => Usuario.findOneAndUpdate({ _id, estado: true }, { estado: false })

const loginUser = async (email, password) => {
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
        throw Error(`(${email}) o contraseña incorrectos`);
    } else {
        if (!bcrypt.compareSync(password, usuarioDB.password)) {
            throw Error(`${email} o (contraseña) incorrectos`);
        } else {
            return jwt.sign({ usuario: usuarioDB }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        }
    }

}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    loginUser
}