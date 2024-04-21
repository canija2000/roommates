const express = require('express');
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const get_gastos = async()=>{
    try{
        const gastos = await JSON.parse(fs.readFileSync('./data/gastos.json','utf-8'))
        return gastos
    }
    catch(err){
        console.log(err)
    }
}

const add_gasto = async(gasto)=>{
    try{
        console.log(gasto.nombre)
        gasto.fecha = new Date()
        gasto.id = uuidv4().slice(0,8)
        const gastojson = JSON.parse(fs.readFileSync('./data/gastos.json','utf-8'))
        gastojson.gastos.push(gasto)
        fs.writeFileSync('./data/gastos.json',JSON.stringify(gastojson,null,2))
    }
    catch(err){
        console.log(err)
    }
}

const del_gasto = async(id)=>{
    try{
        const gastos = await get_gastos()
        const index = gastos.gastos.findIndex(gasto=>gasto.id===id)
        gastos.gastos.splice(index,1)
        fs.writeFileSync('./data/gastos.json',JSON.stringify(gastos,null,2))
    }
    catch(err){
        console.log(err)
    }
}

const edit_gasto = async(id,gasto)=>{
    try{
        const {nombre, monto, descripcion } = gasto
        const gastos = await get_gastos()
        const index = gastos.gastos.findIndex(gasto=>gasto.id===id)
        gastos.gastos[index].nombre = nombre
        gastos.gastos[index].monto = monto
        gastos.gastos[index].descripcion = descripcion

        fs.writeFileSync('./data/gastos.json',JSON.stringify(gastos,null,2))
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {get_gastos, add_gasto, del_gasto, edit_gasto}
