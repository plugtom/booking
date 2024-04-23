const prisma = require("../customer/config/prisma");

exports.getpayment = async (req, res, next) => {
    try {
        const payment = await prisma.payment.findMany();
        res.json({ payment });
      } catch (err) {
        next(err);
      }
};

exports.postpayment = async (req, res, next) => {
    try {
        const { orderId, amount, moneystatus, details } = req.body;

const newPayment = await prisma.payment.create({
    data: {
        amount: parseInt(amount), // Convert amount to integer
        moneystatus: moneystatus === 'true',
        details,
        order: {
            connect: {
                id: Number(orderId),
            },
        },
        user: {
            connect: {
                id: req.user.id,
            },
        },
    },
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
