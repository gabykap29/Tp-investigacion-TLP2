const cloudinary  = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'dv9oxspkw', 
  api_key: process.env.CLOUDINARY_API, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;