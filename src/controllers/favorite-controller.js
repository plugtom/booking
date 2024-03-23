const prisma = require("../config/prisma");


//------------------------------------------------
exports.getFavorite = async (req, res, next) =>{
    try {
        const Favorite = await prisma.favorite.findMany();
        res.json({ Favorite });
      } catch (err) {
        next(err);
      }
}


exports.postFavorite = async (req, res, next) => {
    const { productId, userId, name } = req.body;

    try {
        const newFavorite = await prisma.favorite.create({
            data: {
                name: name,
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
            },
        });

        res.json({ message: "Post Favorite" ,result: newFavorite});
    } catch (err) {
        next(err);
    }
}


exports.putFavorite = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body; // ปรับให้รับเฉพาะ name จาก req.body

    try {
        const updatedFavorite = await prisma.favorite.update({
            where: { id: parseInt(id) }, // แก้ไขให้ระบุ id ในส่วน where ให้ถูกต้อง
            data: { name: name } // อัปเดตเฉพาะชื่อเท่านั้น
        });

        res.json({ message: "Put Favorite ok", result: updatedFavorite });
    } catch (err) {
        next(err);
    }
}


exports.deleteFavorite = async (req, res, next) => {
    const { id } = req.params;
    try {
        const rs = await prisma.favorite.delete({
            where: {
                id: parseInt(id),
                userId: req.user.id // Assuming req.user.id is the ID of the logged-in user
            }
        });
        res.json({ message: "Delete Favorite ok", result: rs });
    } catch (err) {
        next(err);
    }
}