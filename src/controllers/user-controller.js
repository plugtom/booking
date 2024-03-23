const cloudUpload = require("../utils/cloudUpload");
const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const Joi = require('joi');
const {createtShippingAddress} = require("../validator/user-validator")

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

        

        res.json({ newShippingAddress });
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








