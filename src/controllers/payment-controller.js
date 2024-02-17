const cloudUpload = require("../utils/cloudUpload");
const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const {createpaymentSchema } =require("../validator/user-validator")

//------------------------------------------------
exports.getpayment = async (req, res, next) => {
    try {
        const paymentId = req.params.id;
        const payment = await prisma.payment.findMany({
            where: { id: paymentId }
        });
        res.json({ payment });
    } catch (err) {
        next(err);
    }
};

exports.postpayment = async (req, res, next) => {
    try {
        const { orderId, userId, ...value } = req.body;
        const validatedValue = await createpaymentSchema.validateAsync(value);

        const newPayment = await prisma.payment.create({
            data: {
                ...validatedValue,
                Order: {
                    connect: {
                        id: Number(orderId),
                    },
                },
                user: {
                    connect: {
                        id: Number(userId),
                    },
                },
            }
        });

        res.json({ message: "post payment", result: newPayment });
    } catch (err) {
        next(err);
    }
};



exports.putpayment = async (req, res, next) => {
    const { id } = req.params;
    const { data } = req.body;

    try {
        const updatedPayment = await prisma.payment.update({
            where: { id: parseInt(id) },
            data: { ...data }
        });

        res.json({ message: "Put payment ok", result: updatedPayment });
    } catch (err) {
        next(err);
    }
};


exports.deletepayment = async (req, res, next) => {
    const { id } = req.params;
    try {
        const rs = await prisma.payment.delete({
            where: {
                id: parseInt(id),
                userId: req.user.id // Assuming req.user.id is the ID of the logged-in user
            }
        });
        res.json({ message: "delete payment ok", result: rs });
    } catch (err) {
        next(err);
    }
};

