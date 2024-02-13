const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dfxq57duh",
  api_key: "811551125346186",
  api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = cloudinary;
