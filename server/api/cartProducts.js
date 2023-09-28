const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  try {
    const allProducts = await prisma.order_product.findMany();
    res.send(allProducts);
  } catch (err) {
    next(err);
  }
});

router.get("/orders/:id", async (req, res, next) => {
  try {
    const orders = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        Cart: true,
      },
    });
  } catch (err) {
    next(err);
  }
});


module.exports = router;
