const cloudUpload = require("../utils/cloudUpload");
const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const {createProductSchema } =require("../validator/admin-validator")


//-------------------------------------------
//การจัดการproduct
exports.getByproduct = async (req, res, next) => {
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


exports.createproduct = async (req, res, next) => {
  try {
    const value = await createProductSchema.validateAsync(req.body);

    const { categoryId, authorid } = value; 

    const newProduct = await prisma.product.create({
      data: {
        ...value,
        author: {
          connect: {
            id: Number(authorid),
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
        productId: newProduct.id, // แก้ไขการเข้าถึง id ของผลิตภัณฑ์ที่สร้างใหม่
      };
    });

    await prisma.product_Img.createMany({
      data: productImages,
    });

    const finalProduct = await prisma.product.findFirst({
      where: {
        id: newProduct.id, // แก้ไขการเข้าถึง id ของผลิตภัณฑ์ที่สร้างใหม่
      },
      include: {
        product_imgs: true,
      },
    });

    res.json({ newProduct: finalProduct });
  } catch (err) {
    next(err);
  }
};


exports.correctproduct = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const rs = await prisma.product.update({
      where: { id: parseInt(id) }, // แก้ไขให้ระบุ id ในส่วน where ให้ถูกต้อง
      data: { ...data }
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
        userId: req.user.id
      }
    });
    res.json({ message: "delete Product ok", result: rs });
  } catch (err) {
    next(err);
  }
};




//--------------------------------------
//การจัดการcategory
exports.getBycategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id; // หรือวิธีการที่ถูกต้องในการรับค่า categoryId ตามที่คุณต้องการ
    const category = await prisma.category.findMany({
      where: { Category: categoryId } // ใช้ categoryId ที่ได้รับจาก req.params.id แทน req.Category.id
    });
    res.json({ category });
  } catch (err) {
    next(err);
  }
}



exports.createcategory = async (req, res, next) => {
  try {
    const { name, count } = req.body;
    const data = {
      name,
      count: parseInt(count) // Convert count to an integer
    };
    const newCategory = await prisma.category.create({
      data: data
    });

    res.json({ message: "create category ok", category: newCategory });
  } catch (err) {
    next(err);
  }
}



exports.correctcategory = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const rs = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { ...data }
    });
    res.json({ message: "แก้ไขหมวดหมู่เรียบร้อย", result: rs });
  } catch (err) {
    next(err);
  }
}


exports.deletecategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const rs = await prisma.category.delete({ 
      where: { 
        id: parseInt(id),
        userId: req.user.id
      }
    });
    res.json({ message: "ลบหมวดหมู่เรียบร้อย",result: rs });
  } catch (err) {
    next(err);
  }
}



//----------------------------------------
//การจัดการauthor
exports.getByauthor = async (req, res, next) => {
  try {
    const authorId = req.params.id;
    const author = await prisma.author.findMany({
      where: { id: authorId } // ใช้ id ของผู้เขียนที่ได้รับจาก req.params.id
    });
    res.json({ author }); // แก้ไขชื่อตัวแปร category เป็น author
  } catch (err) {
    next(err);
  }
}


exports.createauthor = async (req, res, next) => {
  try {
    const { name, count } = req.body;
    const data = {
      name,
      count: parseInt(count) // แปลงค่า count เป็นจำนวนเต็ม
    };
    const newAuthor = await prisma.author.create({
      data: data
    });

    res.json({ message: "สร้างผู้เขียนเรียบร้อย", author: newAuthor }); // แก้ไขชื่อตัวแปร category เป็น author
  } catch (err) {
    next(err);
  }
}


exports.correctauthor = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const rs = await prisma.author.update({
      where: { id: parseInt(id) },
      data: { ...data }
    });
    res.json({ message: "แก้ไขผู้เขียนเรียบร้อย", result: rs });
  } catch (err) {
    next(err);
  }
}


exports.deleteauthor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const rs = await prisma.author.delete({ 
      where: { 
        id: parseInt(id)
      }
    });
    res.json({ message: "ลบผู้เขียนเรียบร้อย", result: rs });
  } catch (err) {
    next(err);
  }
}


