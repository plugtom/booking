const prisma = require("../admin/config/prisma");

//การจัดการuser
exports.getByuser = async (req, res, next) => {
    try {
      const user = await prisma.user.findMany();
      res.json({ user });
    } catch (err) {
      next(err);
    }
  };
  
  exports.updateuser = async (req, res, next) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
      const rs = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { role },
      });
      res.json({ message: "Update user successful", result: rs });
    } catch (err) {
      next(err);
    }
  };
  
  
exports.deleteuser = async (req, res, next) => {
    const {id} = req.params;
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ message: "Invalid category ID" });
    }

    try {
        const rs = await prisma.user.delete({ where : { id: parseInt(id) }});
        res.json({msg: 'Delete ok', result : rs});
    } catch(err) {
        next(err);
    }
};
