const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const getUsers = () => {
    return new Promise((resolve, reject) => {
        columns = 'nombre email role estado img'
        Usuario.find({ estado: true }, columns)
            .skip(0)
            .limit(5)
            .exec((err, usuarios) => {
                if (err) {
                    return reject({
                        ok: false,
                        err
                    })
                }
                return resolve({
                    ok: true,
                    usuarios
                })
            });
    })
}

const addUser = (nombre, email, password, role) => {
    return new Promise((resolve, reject) => {
        let user = new Usuario({ nombre, email, password: bcrypt.hashSync(password, 10), role });
        user.save((err, userDB) => {
            if (err) {
                return reject({
                    ok: false,
                    err
                })
            }
            return resolve({
                ok: true,
                userDB
            })
        })
    })
}


const updateUser = (_id, nombre, email, password, role) => {
    return new Promise(
        (resolve, reject) => {
            let userUpdate = new Usuario({ _id, nombre, email, password: bcrypt.hashSync(password, 10), role });
            Usuario.
                findByIdAndUpdate(
                    _id,
                    userUpdate,
                    { new: true, runValidators: true },
                    (err, usuarioDB) => {
                        if (err) {
                            return reject({
                                ok: false,
                                err
                            })
                        }

                        return resolve({
                            ok: true,
                            usuarioDB
                        })
                    }
                )
        }
    )
}

const deleteUser = (_id) => {
    return new Promise(
        (resolve, reject) => {
            Usuario.findOneAndUpdate({_id, estado: true},{estado: false}, (err, userDB) => {
                if(err) {
                    return reject({
                        ok: false,
                        code: 400,
                        err
                    })
                }
                if(!userDB){
                    return reject({
                        ok: false,
                        code: 404,
                        err:{
                            message: 'El usuario no ha sido encontrado.'
                        }
                    })
                }

                return resolve({
                    ok: true,
                    success:{
                        message: `Usuario ${userDB.email} eliminado correctamente.`
                    }
                })

            })
        }
    )
    
}

const loginUser = (email, password) => {
    return new Promise(
        (resolve, reject) => {
            Usuario.findOne( {email} , (err, userDB) => {
                if ( err ){
                    return reject( { ok: false, code: 400, err } )
                }
                if ( !userDB ) {
                    return reject( { ok: false, code: 404, err: { message: `(${email}) o contraseña incorrectos`} } )
                }

                if( !bcrypt.compareSync(password, userDB.password) ){
                    return reject( { ok: false, code: 400, err: { message: `${email} o (contraseña) incorrectos`} } )
                }
                
                let token = jwt.sign({usuario: userDB}, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN } )

                return resolve({
                    ok: true,
                    usuario: userDB,
                    token
                })
            })
        }
    )
}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    loginUser
}