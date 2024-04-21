const express = require('express');
const app = express();
const port = 3000;
const roomrutas = require('./routes/matesrutas')
const otrasrutas = require('./routes/rutasgastos')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('views'))

//rutas

app.use('/', roomrutas)
app.use('/',otrasrutas)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

