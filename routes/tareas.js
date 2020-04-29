
const express = require ('express');
const router  = express.Router();
const tareasController = require('../controllers/tareasController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// api/tareas

router.post('/',
    auth,
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('nombre','El proyecto es obligatorio').not().isEmpty()
    ],
    tareasController.crearTarea
);

router.get('/',
    auth,
    tareasController.obtenerTarea
);

router.put('/:id',
    auth,
    tareasController.actualizarTarea
);

router.delete('/:id',
    auth,
    tareasController.eliminarTarea
);

module.exports = router;