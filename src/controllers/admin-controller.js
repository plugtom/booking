const cloudUpload = require("../utils/cloudUpload");
const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const { number } = require("joi");


//-------------------------------------------
//การจัดการproduct
exports.getproduct = async (req, res, next) => {
  try {
    const product = await prisma.product.findMany();
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

exports.getproductByid = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid product ID" });
  }
    const product = await prisma.product.findFirst({
      where: { id: parseInt(id) }
    });
    if (!product) {
      throw new Error('Product not found');
    }
    res.json({ product });
  } catch (err) {
    next(err);
  }
};





exports.createproduct = async (req, res, next) => {
  try {
    const {categoryId,
      stock ,
      title,
      price,
      detail,
      yearpublication,
      numberpages,
      nameauthor
    } = req.body

    const product = await prisma.product.create({
      data: {
        stock: parseInt(stock),
        title,
        price:parseInt(price),
        detail,
        numberpages,
        yearpublication : new Date(yearpublication),
        nameauthor,
        category: { connect: { id: parseInt( categoryId) } }, // Connect the product to the category
        user: { connect: { id: req.user.id } }  
      },
    });
    const imagesPromiseArray = req.files.map((file) => {
      return cloudUpload(file.path);
    });

    const imgUrlArray = await Promise.all(imagesPromiseArray);

    const productImages = imgUrlArray.map((imgUrl) => {
      return {
        url: imgUrl,
        productId: product.id,
      };
    });

    await prisma.product_img.createMany({
      data: productImages,
    });

    const newProduct = await prisma.product.findFirst({
      where: {
        id: product.id,
      },
      include: {
        Product_img: true,
      },
    });
    



    res.json({ message: "create Product ok",product,newProduct});
    console.log(product)
  } catch (err) {
    next(err); 
  }
};





exports.correctproduct = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const rs = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { ...data },
    });
    res.json({ message: "update Product ok", result: rs });
  } catch (err) {
    next(err);
  }
};

exports.deleteproduct = async (req, res, next) => {
  const {id} = req.params;
  try {
      const rs = await prisma.product.delete({ where : { id: parseInt(id) }});
      res.json({msg: 'Delete ok', result : rs});
  } catch(err) {
      next(err);
  }
};


