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
router.put("/ShippingAddress/:ShippingAddressId",userController.putShippingAddress)
router.delete("/ShippingAddress/:ShippingAddressId",userController.deleteShippingAddress)

router.get("/Favorite",userFavorite.getFavorite)
router.post("/Favorite",userFavorite.postFavorite)
router.put("/Favorite/:FavoriteId",userFavorite.putFavorite)
router.delete("/Favorite/:FavoriteId",userFavorite.deleteFavorite)

router.get("/Cart",userCart.deleteCart)
router.post("/Cart",userCart.postCart)
router.put("/Cart/:CartId",userCart.putCart)
router.delete("/Cart/:CartId",userCart.deleteCart)

router.get("/Order",userOrder.deleteOrder)
router.post("/Order",userOrder.postOrder)
router.put("/Order/:OrderId",userOrder.putOrder)
router.delete("/Order/:OrderId",userOrder.deleteOrder)

router.get("/payment",userpayment.getpayment)
router.post("/payment",userpayment.postpayment)
router.put("/payment/:paymentId",userpayment.putpayment)
router.delete("/payment/:paymentId",userpayment.deletepayment)





module.exports = router;

    