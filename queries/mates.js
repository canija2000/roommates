const axios = require('axios')
const fs = require('fs')
const { get } = require('http')
const {v4} = require('uuid')
const {get_gastos} = require('./gastos')

const api_url = 'https://randomuser.me/api/'

const agg_romi = async(req,res)=>{
    try{
        const data = await axios.get(api_url)
        //primer usuario
        const r_user = data.data.results[0]

        const id = v4().slice(0,8)
        const user = {
            id,
            nombre : `${r_user.name.first} ${r_user.name.last}`,
            email: r_user.email,
            debe: 0,
            recibe: 0
        }
        //actualizar json
        const romijson = JSON.parse(fs.readFileSync('./data/romies.json','utf-8'))
        romijson.rommies.push(user)
        fs.writeFileSync('./data/romies.json',JSON.stringify(romijson,null,2))
        return user
    }
    catch(err){
        console.log(err)
    }
}


const get_romi = async(req,res)=>{
    try{
        const romijson = await JSON.parse(fs.readFileSync('./data/romies.json','utf-8'))
        
        return romijson

    }
    
    catch(err){
        console.log(err)
    }
}

const calc_deudas = async(req,res)=>{
    const gastos = await get_gastos()
    const gastos_arr = gastos.gastos 
    try{
        const romijson = await get_romi()

        const rommies = romijson.rommies

        rommies.forEach(rommie=>{
            rommie.debe = 0
            rommie.recibe = 0
        })

        gastos_arr.forEach(gasto=>{
            const {nombre,monto} = gasto
            const romi = rommies.find(rommie=>rommie.nombre===nombre)
            const monto_por_romi = monto / rommies.length
            rommies.forEach(rommie=>{
                if(rommie.nombre===nombre){
                    rommie.recibe += monto_por_romi
                }
                else{
                    rommie.debe += monto_por_romi
                }
            })
        })       
    

        //reescribir json
        fs.writeFileSync('./data/romies.json',JSON.stringify(romijson,null,2))



        
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {agg_romi,get_romi,calc_deudas}

