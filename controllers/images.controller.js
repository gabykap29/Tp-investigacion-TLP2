const ctrlImages = {};
const Images = require('../models/images');
const path = require('path')
const cloudinary = require('../utils/cloudinary');


ctrlImages.create = async (req,res)=>{
    const{titulo,descripcion}= req.body;
    console.log(req.body)
    try{
        // if (!req.files || Object.keys(req.files).length === 0) {
        //     return res.status(400).send('No files were uploaded.');
        //   }
          let imagenFile;

        imagenFile = req.files.imagen;
        let result = await cloudinary.uploader.upload(imagenFile.tempFilePath,{
            public_id: `${Date.now()}`,
            resource_type:'auto',
            folder:'images'
        })
        let rutaImagen = result.url
        const imagen = await Images.create({
          titulo,
          rutaImagen: rutaImagen,
          descripcion,
        })
        console.log(imagen)
        imagenFile.mv(result, function(err){
          if(err){
              return res.status(500).json(err);
          }
          res.render(index)
        })
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }


}
ctrlImages.reads = async (req,res)=>{
    try {
        const imagenes = await Images.findAll({
        })
        if(!imagenes){
            throw({
                status:404,
                message:'No hay imagenes!'
            })
        }
        console.log(imagenes)
        res.status(200).json(imagenes);
    } catch (error) {
        return res.status(error.message || 500).json({
            message:''
        })
    }
}
ctrlImages.update = async (req,res)=>{
    const {id}=req.params.id;
    const{titulo,descripcion}= req.body;
    console.log(req.body)
    try{
          let imagenFile;

        imagenFile = req.files.imagen;
        let result = await cloudinary.uploader.upload(imagenFile.tempFilePath,{
            public_id: `${Date.now()}`,
            resource_type:'auto',
            folder:'images'
        })
        let rutaImagen = result.url
        const imagen = await Images.update({
          titulo,
          rutaImagen: rutaImagen,
          descripcion,
        },{
            where:{
                id:req.params.id
            }
        });
        console.log(imagen)
        imagenFile.mv(result, function(err){
          if(err){
              return res.status(500).json(err);
          }
          res.render(index)
        })
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }


}

ctrlImages.Delete = async (req,res)=>{
    const {id}= req.params
    try {
        const imagenEliminada = await Images.destroy({
            where:{id}
        });
        if(!imagenEliminada){
            throw({
                status:500,
                message: 'error interno del servidor!'
            })
        }
        let mensaje = 'Eliminado con exito'
        return res.json(mensaje);
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || 'error interno del servidor'
        })
    }
}
module.exports = ctrlImages;