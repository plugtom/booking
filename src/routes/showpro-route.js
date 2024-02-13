const exprss = require("express")
const showproductController = require("../controllers/showproduct-controller");
const authenticate = require("../middlewares/authenticate");

const router  = exprss.Router()

router.get("/landing",showproductController.getProductsLanding );
router.get("/", showproductController.getProducts);
router.get("/:productId", authenticate, showproductController.getProducts);

module.exports = router;