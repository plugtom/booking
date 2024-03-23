const express = require("express")
const adminController = require("../controllers/admin-controller");
const categoryController = require("../controllers/category-controller");
const upload = require("../middlewares/upload");

const userController = require("../controllers/admin/user-controller")
const orderController = require("../controllers/admin/order-controller")


const router = express.Router();

//การจัดการproduct

  router.get("/product",adminController.getproduct)
  router.get("/productByid",adminController.getproductByid)
  router.post("/product",upload.array("images", 5),adminController.createproduct);
  router.put("/product/:id",adminController.correctproduct);
  router.delete("/product/:id",adminController.deleteproduct)

  
  //การจัดการcategory
  router.get("/category",categoryController.getBycategory)
  router.post("/category",categoryController.createcategory);
  router.put("/category/:id",categoryController.updatecategory);
  router.delete("/category/:id",categoryController.deletecategory)

  //การจัดการ
  router.get("/user",userController.getByuser)
  router.put("/user/:id",userController.updateuser);
  router.delete("/user/:id",userController.deleteuser)

    //การจัดการ
    router.get("/order",orderController.getOrder)
    router.delete("/order/:id",orderController.deleteOrder)

  
  module.exports = router;
