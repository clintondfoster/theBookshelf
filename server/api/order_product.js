const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authorization = require("../middleware") ;

// get an unfulfilled order
router.get("/", authorization, async (req, res, next) => {
  try {
    const openOrder = await prisma.order.findFirst({
      where: {
        userId: req.user.id,
        isFulfilled: false,
      },
      include: {
        order_products: true,
      },
    });
    res.status(200).send({ cart: openOrder.order_products });


  } catch (err) {
    console.error(err);
    next(err);
  }
});

// adding item to cart
router.post("/", authorization, async (req, res, next) => {
  const { booksId, quantity, price } = req.body;
  try {
    const openOrder = await prisma.order.findFirst({
      where: {
        userId: req.user.userId,
        isFulfilled: false,
      },
      include: {
        order_products: true,
      },
    });

    const createdOrderProduct = await prisma.order_product.create({
      data: {
        orderId: openOrder.id,
        booksId,
        quantity,
        price,
      },
    });
    
    

    res.send({ addedToCart: createdOrderProduct });
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", authorization, async (req, res, next) => {
  const { booksId, quantity, price } = req.body;
  try {
  
    const deleteOrderProduct = await prisma.order_product.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    const deletedFromOrder = await prisma.order.findFirst({
      where: {
        userId: req.user.userId,
        isFulfilled: false,
      },
      include: {
        order_products: true,
      },
    });

    res.send({deleteOrderProduct: deletedFromOrder.order_products});
  } catch (err) {
    next(err);
  }
});

// router.delete("/:id", authorization,  async (req, res, next) => {
//   const { booksId, quantity, price } = req.body;
//   try {
//     const openOrder = await prisma.order.findFirst({
//       where: {
//         userId: req.user.userId,
//         isFulfilled: false,
//       },
//       include: {
//         order_products: true,
//       },
//     });

//     const deleteOrderProduct = await prisma.order_product.delete({
//       where: {
//         id: Number(req.params.id),
//       },
//     });

//     res.send(deleteOrderProduct);
//   } catch (err) {
//     next(err);
//   }
// });

router.put("/:id", authorization, async (req, res, next) => {
  const { booksId, quantity, price } = req.body;
  try {
    const openOrder = await prisma.order.findFirst({
      where: {
        userId: req.user.userId,
        isFulfilled: false,
      },
      include: {
        order_products: true,
      },
    });

    const updateOrderProduct = await prisma.order_product.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.send(updateOrderProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
