const express = require("express");


const userController = require("../controllers/user-controller")
const userFavorite = require("../controllers/favorite-controller")
const userCart = require("../controllers/cart-controller")
const userOrder = require("../controllers/order-controller")
const userpayment = require("../controllers/payment-controller")

const upload = require("../middlewares/upload");

const router = express.Router();



router.get("/ShippingAddress",userController.getShippingAddress)
router.post("/ShippingAddress",userController.postShippingAddress)
router.put("/ShippingAddress/:id",userController.putShippingAddress)
router.delete("/ShippingAddress/:id",userController.deleteShippingAddress)

router.get("/Favorite",userFavorite.getFavorite)
router.post("/Favorite",userFavorite.postFavorite)
router.put("/Favorite/:id",userFavorite.putFavorite)
router.delete("/Favorite/:id",userFavorite.deleteFavorite)

router.get("/Cart",userCart.deleteCart)
router.post("/Cart",userCart.postCart)
router.put("/Cart/:id",userCart.putCart)
router.delete("/Cart/:id",userCart.deleteCart)

router.get("/Order",userOrder.deleteOrder)
router.post("/Order",userOrder.postOrder)
router.put("/Order/:id",userOrder.putOrder)
router.delete("/Order/:id",userOrder.deleteOrder)

router.get("/payment",userpayment.getpayment)
router.post("/payment",userpayment.postpayment)
router.put("/payment/:id",userpayment.putpayment)
router.delete("/payment/:id",userpayment.deletepayment)





module.exports = router;

    