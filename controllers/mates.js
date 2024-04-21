const { agg_romi, get_romi, calc_deudas} = require('../queries/mates')

const path = require('path')


// ruta principal
const casa = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/main.html'))
}

// agregar roomie

const addRommie = async(req, res) => {
    try{
        let user = await agg_romi()
        calc_deudas()
        res.json({message: 'roomie agregado', user:user})
    }
    catch(err){
        console.log(err)
    }
}

// obtener roomies

const getRommie = async(req, res) => {
    try{
        const romjson = await get_romi()
        res.json(romjson)
    }
    catch(err){
        console.log(err)
    }
}


module.exports = {casa, addRommie, getRommie}
