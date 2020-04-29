const Proyecto = require('../models/Proyectos');
const Tarea = require('../models/Tarea');
const { validationResult } = require('express-validator');


// 

exports.crearTarea = async (req, res) => {
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        res.status(400).json({ errores : errores.array()});
    }

    try {
        
        const { proyecto } = req.body;

        const existe_proyecto = await Proyecto.findById(proyecto);

        if(!existe_proyecto){
            return res.status(404).json({msg :'Proyecto no Encontrado'});   
        }

        if(existe_proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}



exports.obtenerTarea = async (req, res) => {

    try {
        
        const { proyecto } = req.query;

        const existe_proyecto = await Proyecto.findById(proyecto);

        if(!existe_proyecto){
            return res.status(404).json({msg :'Proyecto no Encontrado'});   
        }

        if(existe_proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        const tareas = await Tarea.find({proyecto});
        res.json({tareas});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}




exports.actualizarTarea = async (req, res) => {

    try {
        
        const { proyecto,nombre,estado } = req.body;

        let tarea = await Tarea.findById(req.params.id);

        if(!tarea){
            return res.status(404).json({msg :'Tarea no Encontrado'});   
        }

        const existe_proyecto = await Proyecto.findById(proyecto);

        if(existe_proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }


        const nuevaTarea = {};
        nuevaTarea.nombre = nombre
        nuevaTarea.estado = estado;

        tarea = await Tarea.findOneAndUpdate({_id:req.params.id},nuevaTarea,{new:true});

        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}


exports.eliminarTarea = async (req, res) => {

    try {
        
        const { proyecto } = req.query;

        let tarea = await Tarea.findById(req.params.id);
        console.log(req.params);
        if(!tarea){
            return res.status(404).json({msg :'Tarea no Encontrado'});   
        }

        const existe_proyecto = await Proyecto.findById(proyecto);

        if(existe_proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        await Tarea.findOneAndRemove({ _id : req.params.id});

        res.json({msg:'Tarea Eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}