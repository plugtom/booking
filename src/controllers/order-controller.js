const cloudUpload = require("../utils/cloudUpload");
const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const {createOrdertSchema } =require("../validator/user-validator")

//------------------------------------------------
exports.getOrder = async (req, res, next) => {
    try {
        const Order = await prisma.order.findMany();
        res.json({ Order });
      } catch (err) {
        next(err);
      }
};


exports.postOrder = async (req, res, next) => {
    try {
        const value = await createOrdertSchema.validateAsync(req.body);
        const { productId, userId, shippingAddressId } = req.body;
        const newOrder = await prisma.order.create({
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
                Shipping_Address: {
                    connect: {
                        id: Number(shippingAddressId),
                    },
                }
            }
        });
        res.json({ message: "post Order", result: newOrder });
    } catch (err) {
        next(err);
    }
};


exports.putOrder = async (req, res, next) => {
    const { id } = req.params;
    const { data } = req.body;

    try {
        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { ...data  }
        });

        res.json({ message: "put Order", result: updatedOrder });
    } catch (err) {
        next(err);
    }
};


exports.deleteOrder = async (req, res, next) => {
    const { id } = req.params;
    try {
        const rs = await prisma.order.delete({
            where: {
                id: parseInt(id),
                userId: req.user.id // Assuming req.user.id is the ID of the logged-in user
            }
        });
        res.json({ message: "delete Order ok", result: rs });
    } catch (err) {
        next(err);
    }
};

