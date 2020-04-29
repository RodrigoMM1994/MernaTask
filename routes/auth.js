// rutas para crear usuarios

const express = require('express');
const router = express.Router();
const authControlller = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
// Crea un usuario
// api/auth
router.post('/',
    authControlller.autenticarUsuario
);

router.get('/', 
    auth,
    authControlller.usuarioAutenticado
);

module.exports = router;