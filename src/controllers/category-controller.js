const prisma = require("../config/prisma");

//การจัดการcategory
exports.getBycategory = async (req, res, next) => {
    try {
      const categories = await prisma.category.findMany();
      res.json({ categories });
    } catch (err) {
      next(err);
    }
  };
  
  exports.createcategory = async (req, res, next) => {
    try {
      const { name } = req.body;
      const data = {
        name
      };
      const newCategory = await prisma.category.create({
        data: data,
      });
  
      res.json({ message: "create category ok", category: newCategory });
    } catch (err) {
      next(err);
    }
  };
  
  exports.updatecategory = async (req, res, next) => {
    const {id} = req.params;
    const data = req.body;

    // Validate req.params.id as a number
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
    }

    try {
        const rs = await prisma.category.update({
            where: { id: parseInt(id) },
            data: { ...data },
        });

        res.json({ msg: 'Update ok', result: rs });
    } catch (err) {
        next(err);
    }
};


  
exports.deletecategory = async (req, res, next) => {
    const {id} = req.params;
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ message: "Invalid category ID" });
    }

    try {
        const rs = await prisma.category.delete({ where : { id: parseInt(id) }});
        res.json({msg: 'Delete ok', result : rs});
    } catch(err) {
        next(err);
    }
};
