const express = require("express");
const router = express.Router();

router.use("/books", require("./books"));
router.use("/users", require("./users"));
router.use("/order", require("./order"));
router.use("/orderproduct", require("./order_product"));

module.exports = router;
