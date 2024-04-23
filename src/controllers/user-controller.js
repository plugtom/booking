const cloudUpload = require("../utils/cloudUpload");
const prisma = require("../config/prisma");
const createError = require("../utils/createError");
exports.getShippingAddress = async (req, res, next) => {
    try {
        const shipping_Address = await prisma.shipping_Address.findMany();
        res.json({ shipping_Address });
        
    } catch (err) {
        
        next(err);
    }
};

exports.postShippingAddress = async (req, res, next) => {
    try {
        const { firstName, lastName, phone, identityNumber, address, postalCode, province, district, subDistrict } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "ผู้ใช้ไม่ได้รับการรับรองสิทธิ์" });
        }

        const newShippingAddress = await prisma.shipping_Address.create({
            data: {
                firstName,
                lastName,
                phone,
                identityNumber: new Date(identityNumber),
                address,
                postalCode,
                province,
                district,
                subDistrict,
                user: { connect: { id: req.user.id } } 
            },
        });

        const imagesPromiseArray = req.files.map((file) => {
            return cloudUpload(file.path);
          });
      
          const imgUrlArray = await Promise.all(imagesPromiseArray);
      
          const ShippingImages = imgUrlArray.map((imgUrl) => {
            return {
              url: imgUrl,
              shippingAddressId: newShippingAddress.id,
            };
          });
      
          await prisma.ShippingAddressImage.createMany({
            data: ShippingImages,
          });
      
          const newShippingWithImages = await prisma.shipping_Address.findUnique({
            where: {
              id: newShippingAddress.id,
            },
            include: {
                images: true,
            },
          });
      
        res.json({ newShippingAddress: newShippingAddress, newShippingWithImages: newShippingWithImages });
    } catch (err) {
        next(err);
    }
};






  

exports.putShippingAddress = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const rs = await prisma.shipping_Address.update({
            where: { id: parseInt(id) },
            data: { ...data }
        });
        res.json({ message: "put ShippingAddress", result: rs });
    } catch (err) {
        next(err);
    }
};


exports.deleteShippingAddress = async (req, res, next) => {
    const {id} = req.params;
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ message: "Invalid shipping_Address ID" });
    }

    try {
        const rs = await prisma.shipping_Address.delete({ where : { id: parseInt(id) }});
        res.json({msg: 'Delete ok', result : rs});
    } catch(err) {
        next(err);
    }
};








