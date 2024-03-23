const prisma = require("../admin/config/prisma");


//------------------------------------------------
exports.getOrder = async (req, res, next) => {
    try {
        const Order = await prisma.order.findMany();
        res.json({ Order });
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

