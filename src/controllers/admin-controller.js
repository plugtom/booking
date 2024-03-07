const cloudUpload = require("../utils/cloudUpload");
const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const { createProductSchema } = require("../validator/admin-validator");

//-------------------------------------------
//การจัดการproduct
exports.getByproduct = async (req, res, next) => {
  try {
    const author = await prisma.product.findMany();
    res.json({ author });
  } catch (err) {
    next(err);
  }
};

exports.createproduct = async (req, res, next) => {
  try {
    const value = await createProductSchema.validateAsync(req.body);

    const { categoryId, authorId } = value;

    const newProduct = await prisma.product.create({
      data: {
        ...value,
        author: {
          connect: {
            id: Number(authorId),
          },
        },
        category: {
          connect: {
            id: Number(categoryId),
          },
        },
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    const imagesPromiseArray = req.files.map((file) => {
      return cloudUpload(file.path);
    });

    const imgUrlArray = await Promise.all(imagesPromiseArray);

    const productImages = imgUrlArray.map((imgUrl) => {
      return {
        url: imgUrl,
        productId: newProduct.id,
      };
    });

    await prisma.product_img.createMany({
      data: productImages,
    });

    const finalProduct = await prisma.product.findFirst({
      where: {
        id: newProduct.id,
      },
      include: {
        product_imgs: true, // Check that this is the correct field name in your Prisma schema
      },
    });

    res.json({ newProduct: finalProduct });
  } catch (err) {
    next(err); // Pass any caught errors to the error handler middleware
  }
};



exports.correctproduct = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const rs = await prisma.product.update({
      where: { id: parseInt(id) }, // แก้ไขให้ระบุ id ในส่วน where ให้ถูกต้อง
      data: { ...data },
    });
    res.json({ message: "correct Product ok", result: rs });
  } catch (err) {
    next(err);
  }
};

exports.deleteproduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const rs = await prisma.product.delete({
      where: {
        id: parseInt(id),
        // เพิ่ม userId ของผู้ใช้เข้าไปในเงื่อนไขการลบ
        userId: req.user.id,
      },
    });
    res.json({ message: "delete Product ok", result: rs });
  } catch (err) {
    next(err);
  }
};


//การจัดการauthor
exports.getByauthor = async (req, res, next) => {
  try {
    const author = await prisma.author.findMany();
    res.json({ author });
  } catch (err) {
    next(err);
  }
};

exports.createauthor = async (req, res, next) => {
  try {
    const { name, count } = req.body;
    const data = {
      name,
      count: parseInt(count), // แปลงค่า count เป็นจำนวนเต็ม
    };
    const newAuthor = await prisma.author.create({
      data: data,
    });

    res.json({ message: "สร้างผู้เขียนเรียบร้อย", author: newAuthor }); // แก้ไขชื่อตัวแปร category เป็น author
  } catch (err) {
    next(err);
  }
};

exports.correctauthor = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const rs = await prisma.author.update({
      where: { id: parseInt(id) },
      data: { ...data },
    });
    res.json({ message: "แก้ไขผู้เขียนเรียบร้อย", result: rs });
  } catch (err) {
    next(err);
  }
};

exports.deleteauthor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const rs = await prisma.author.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "ลบผู้เขียนเรียบร้อย", result: rs });
  } catch (err) {
    next(err);
  }
};
