const express = require("express")
const router = express.Router();
const authController = require("../controllers/auth-controller")



router.post("/register",authController.register );
router.post("/login", authController.login);
router.post("/forget-password",()=>{});
router.get("/forget-password/:token", ()=>{});
router.post("/reset-password/:token", ()=>{});

module.exports = router;