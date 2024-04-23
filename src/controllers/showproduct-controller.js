const prisma = require("../config/prisma");


exports.getProductsLanding = async (req, res, next) => {
    try {
      const { title } = req.params; // หรือจะใช้ req.query.name ก็ได้เช่นกัน ขึ้นอยู่กับว่าคุณจะส่งชื่อผ่านทาง URL หรือ query parameter
      const products = await prisma.product.findMany({
        where: {
            title: {
            contains: title // ใช้ contains ในการตรวจสอบว่าชื่อของผลิตภัณฑ์มีการตรงกับ name ที่ส่งเข้ามาหรือไม่
          }
        },
        include: {
          category: true,
          Product_img: true,
        },
      });
      res.json({ products });
    } catch (err) {
      next(err);
    }
  };
  


  
  exports.getProducts = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({
          include: {
            category: true,
            Product_img: true,
          },
        });
        res.json({ products });
      } catch (err) {
        next(err);
      }
  };

  
  
  exports.getProductById = async (req, res, next) => {
    const { id } = req.params;
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
    
    try {
      
  
      const product = await prisma.product.findFirst({
        where: { id: parseInt(id) },
        include: {
          category: true,
          Product_img: true,
        },
      });
  
      if (!product) {
        return createError(400, 'Product not found');
      }
  
      res.json({ product });
    } catch (err) {
      next(err);
    }
  };
  
  
