const ctrlImages = {};
const Images = require('../models/images');
const path = require('path')

ctrlImages.create = async (req,res)=>{
    try{
        // if (!req.files || Object.keys(req.files).length === 0) {
        //     return res.status(400).send('No files were uploaded.');
        //   }
          let imagenFile;
          let uploadPath;

        imagenFile = req.files.imagen;
        uploadPath = path.join(__dirname,'../public/imagenes/',imagenFile.name);
        const imagen = await Images.create({
          rutaImagen: uploadPath,
        })
  
        imagenFile.mv(uploadPath, function(err){
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