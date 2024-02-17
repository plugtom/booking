const cloudUpload = require("../utils/cloudUpload");
const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const {createtShippingAddress} = require("../validator/user-validator")

exports.getShippingAddress = async (req, res, next) => {
    try {
        const shippingId = req.params.id;
        const shipping = await prisma.shipping_Address.findUnique({
            where: { id: Number(shippingId) }
        });
        if (!shipping) {
            return res.status(404).json({ error: "Shipping address not found" });
        }
        res.json({ shipping });
    } catch (err) {
        next(err);
    }
};


exports.postShippingAddress = async (req, res, next) => {
    try {
        const value = await createtShippingAddress.validateAsync(req.body);

        const newShippingAddress = await prisma.shipping_Address.create({
            data: {
                ...value,
                user: {
                    connect: {
                        id: req.user.id,
                    },
                },
            },
        });

        const imagesPromiseArray = req.files.map((file) => {
            return cloudUpload(file.path);
        });

        const imgUrlArray = await Promise.all(imagesPromiseArray);

        const shippingAddressImages = imgUrlArray.map((imgUrl) => {
            return {
                url: imgUrl,
                shippingAddressId: newShippingAddress.id,
            };
        });

        await prisma.Shipping_Address_Image.createMany({
            data: shippingAddressImages,
        });

        const finalShippingAddress = await prisma.shipping_Address.findFirst({
            where: {
                id: newShippingAddress.id,
            },
            include: {
                shipping_Address_Images: true,
            },
        });

        res.json({ newShippingAddress: finalShippingAddress });
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
    const { id } = req.params;
    try {
        const rs = await prisma.shipping_Address.delete({
            where: {
                id: parseInt(id),
                user: { id: req.user.id }
            }
        });
        res.json({ message: "delete ShippingAddress ok", result: rs });
    } catch (err) {
        next(err);
    }
};








