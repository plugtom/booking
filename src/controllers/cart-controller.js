const cloudUpload = require("../utils/cloudUpload");
const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const {createCartSchema } =require("../validator/user-validator")

//------------------------------------------------
exports.getCart = async (req, res, next) => {
    try {
        const carts = await prisma.cart.findMany();
        res.json({ carts });
    } catch (err) {
        next(err);
    }
};



exports.postCart = async (req, res, next) => {
    try {
        const value = await createCartSchema.validateAsync(req.body);
        const newCart = await prisma.cart.create({
            data: {
                ...value,
                product: {
                    connect: {
                        id: Number(productId),
                    },
                },
                user: {
                    connect: {
                        id: Number(userId),
                    },
                },
            }
        });

        res.json({ message: "post Cart", result: newCart });
    } catch (err) {
        next(err);
    }
};


exports.putCart = async (req, res, next) => {
    const { id } = req.params;
    const { data } = req.body;

    try {
        const updatedCart = await prisma.cart.update({
            where: { id: parseInt(id) },
            data: { ...data}
        });

        res.json({ message: "Put Cart ok", result: updatedCart });
    } catch (err) {
        next(err);
    }
};

exports.deleteCart = async (req, res, next) => {
    const { id } = req.params;
    try {
        const rs = await prisma.cart.delete({
            where: {
                id: parseInt(id),
                userId: req.user.id // Assuming req.user.id is the ID of the logged-in user
            }
        });
        res.json({ message: "delete Cart ok", result: rs });
    } catch (err) {
        next(err);
    }
};

