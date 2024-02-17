const prisma = require("../config/prisma");


exports.getProductsLanding = (req, res, next) => {
  exports.getProductsLanding = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany();
        res.json({ products });
    } catch (err) {
        next(err);
    }
};

  };
  
  exports.getProducts = async (req, res, next) => {
    exports.getProducts = async (req, res, next) => {
      try {
          const products = await prisma.product.findMany();
          res.json({ products });
      } catch (err) {
          next(err);
      }
  };
  };
  
  
  exports.getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await prisma.product.findUnique({
            where: { id: Number(productId) }
        });
        res.json({ product });
    } catch (err) {
        next(err);
    }
};
