const express = require("express")
const adminController = require("../controllers/admin-controller");
const categoryController = require("../controllers/category-controller");
const upload = require("../middlewares/upload");


const router = express.Router();

//การจัดการproduct

  router.get("/product",adminController.getByproduct)
  router.post("/product",upload.array("images", 5),adminController.createproduct);
  router.put("/product/:productId",adminController.correctproduct);
  router.delete("/product/:productId",adminController.deleteproduct)

  
  //การจัดการcategory
  router.get("/category",categoryController.getBycategory)
  router.post("/category",categoryController.createcategory);
  router.put("/category/:id",categoryController.updatecategory);
  router.delete("/category/:id",categoryController.deletecategory)

//การจัดการauthor
  router.get("/author",adminController.getByauthor)
  router.post("/author",adminController.createauthor);
  router.put("/author/:id",adminController.correctauthor);
  router.delete("/author/:id",adminController.deleteauthor)
  
  
  module.exports = router;
