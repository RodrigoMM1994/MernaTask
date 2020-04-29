
const express = require ('express');
const router  = express.Router();
const proyectosController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post('/',    
    auth,
    [
        check('nombre','El nombre es obligatorio').not().isEmpty()
    ],
    proyectosController.crearProyecto
);

router.get('/',    
    auth,
    proyectosController.obtenerProyectos
)

router.put('/:id',
    auth,
    [
        check('nombre','El nombre es obligatorio').not().isEmpty()
    ],
    proyectosController.actualizaProyecto
)

router.delete('/:id',
    auth,
    proyectosController.eliminarProyecto
)


module.exports = router;