const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config()

cloudinary.config({
    cloud_name: 'daqyvggzm',
    api_key: '869615222378633',
    api_secret: process.env.api_secret
});

const storage = new CloudinaryStorage({ cloudinary })

module.exports = multer({ storage })
