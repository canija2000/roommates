
const { get_gastos,add_gasto, del_gasto, edit_gasto} = require('../queries/gastos')
const {calc_deudas} = require('../queries/mates')

const getGastos = async(req, res) => {
    try{
        const gastosjson = await get_gastos()
        res.json(gastosjson)
    }
    catch(err){
        console.log(err)
    }
}

const createGasto = async(req, res) => {
    try{
        const newGasto  = req.body
        await add_gasto(newGasto)
        calc_deudas()
        res.send('Gasto agregado')
    }
    catch(err){
        console.log(err)
    }
}


const deleteGasto = async(req, res) => {
    try{
        const id = req.query.id

        await del_gasto(id)
        calc_deudas()
        res.send('Gasto eliminado satisfactoriamente')
    }
    catch(err){
        console.log(err)
    }
}

const updateGasto = async(req,res)=> {
    try{
        const id = req.query.id
        const gasto = req.body
        
        await edit_gasto(id,gasto)
        await calc_deudas()
        res.send('Gasto actualizado')
    }
    catch (err){
        console.log(err)
    }
}

module.exports = {createGasto,getGastos,updateGasto,deleteGasto}
