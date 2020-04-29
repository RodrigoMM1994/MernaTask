
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

//habilitar cors
app.use(cors());

//Habilirar expres.json
app.use(express.json({ extended : true}));

// Puerto de la app
const PORT = process.env.PORT || 4000;

// Importar rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyecto'));
app.use('/api/tareas',require('./routes/tareas'));

// Definir la pagina pricipal
app.get('/', (req,res) =>{
    res.send("Hola Mundo");
})

// arrancar el servidor

app.listen(PORT, () =>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});