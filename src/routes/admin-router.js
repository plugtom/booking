const express = require("express")
const adminController = require("../controllers/admin-controller");
const upload = require("../middlewares/upload");


const router = express.Router();

//การจัดการproduct

  router.get("/product",adminController.getByproduct)
  router.post("/product",upload.array("images", 5),adminController.createproduct);
  router.put("/product/:productId",adminController.correctproduct);
  router.delete("/product/:productId",adminController.deleteproduct)

  
  //การจัดการcategory
  router.get("/category",adminController.getBycategory)
  router.post("/category",adminController.createcategory);
  router.put("/category:/categoryId",adminController.correctcategory);
  router.delete("/category/:/categoryId",adminController.deletecategory)

//การจัดการauthor
  router.get("/author",adminController.getByauthor)
  router.post("/author",adminController.createauthor);
  router.put("/author:/authorId",adminController.correctauthor);
  router.delete("/author/:/authorId",adminController.deleteauthor)
  
  
  module.exports = router;
