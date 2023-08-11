const ctrlImages = {};
const Images = require('../models/images');
const path = require('path')
const cloudinary = require('../utils/cloudinary');

ctrlImages.create = async (req,res)=>{
    const{titulo,observaciones}= req.body;
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
          observaciones,
        })
        console.log(imagen)
        imagenFile.mv(result, function(err){
          if(err){
              return res.status(500).json(err);
          }
          res.json(imagen)
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
module.exports = ctrlImages;