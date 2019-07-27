const getNombre = async(nombre) => {
    if ( nombre instanceof String || typeof nombre === 'string' ) {
        if ( nombre.length === 0 ) {
            throw Error("El campo nombre esta vacio.")
        } else {
            return `\nHola ${nombre}.`
        }
    } else {
        throw Error("El campo nombre debe ser texto.")
    }
}
/*
getNombre('')
    .then( msg => console.log(msg) )
    .catch( err => console.log(err) )
    .finally( () => console.log('Fin de ejecución') )
*/

funci= async () => {
    return "MATIAS"
}

let saludo = await aa();
console.log(saludo)