const express = require("express");


const userController = require("../controllers/user-controller")
const userFavorite = require("../controllers/favorite-controller")
const userCart = require("../controllers/customer/cart-controller")
const userOrder = require("../controllers/customer/order-controller")
const userpayment = require("../controllers/customer/payment-controller")

const upload = require("../middlewares/upload");

const router = express.Router();



router.get("/ShippingAddress",userController.getShippingAddress)
router.post("/ShippingAddress",upload.array("images", 5),userController.postShippingAddress)
router.put("/ShippingAddress/:id",userController.putShippingAddress)
router.delete("/ShippingAddress/:id",userController.deleteShippingAddress)

router.get("/Cart",userCart.getCart)
router.post("/Cart",userCart.postCart)
router.put("/Cart/:id",userCart.putCart)
router.delete("/Cart/:id",userCart.deleteCart)

router.get("/Order",userOrder.getOrder)
router.post("/Order",userOrder.postOrder)
router.put("/Order/:id",userOrder.putOrder)
router.delete("/Order/:id",userOrder.deleteOrder)

router.get("/payment",userpayment.getpayment)
router.post("/payment",userpayment.postpayment)
router.put("/payment/:id",userpayment.putpayment)
router.delete("/payment/:id",userpayment.deletepayment)





module.exports = router;

    