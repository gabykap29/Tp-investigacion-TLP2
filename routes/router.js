const express = require('express');
const { create, reads,Delete, update } = require('../controllers/images.controller');
const path = require('path');
const router = express.Router();

// Configura el middleware para servir archivos estáticos desde la carpeta 'public'
router.use('/imagenes', express.static(path.join(__dirname, '..', 'public', 'imagenes')));

router.get('/index', (req, res) => {
    res.render('index');
});
router.get('/subir',(req,res)=>{
    res.render('subir')
})
router.get('/imagenes',(req,res)=>{
    res.render('views')
})
router.get('/editar/:id',(req,res)=>{
    res.render('edit',{id: req.params.id})
})
router.post('/api/cargar', create);
router.get('/api/obtener', reads);
router.put('/api/editar/:id',update);
router.delete('/api/eliminar/:id',Delete);

module.exports = router;
