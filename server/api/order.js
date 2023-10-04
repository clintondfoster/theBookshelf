const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authorization = require("../middleware");

// get all
router.get("/", authorization, async (req, res, next) => {
  try {
    const uniqueUser = await prisma.users.findFirst({
      where: {
        id: req.user.id,
      },
    });
    const allOrders = await prisma.order.findMany({
      where: {
        userId: uniqueUser.id,
        isFulfilled: true,
      },
    });
    res.status(200).send({ allOrders });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// get order by id
router.get("/:id", authorization, async (req, res, next) => {
  try {
    const uniqueUser = await prisma.users.findFirst({
      where: {
        id: req.user.id,
      },
    });
    const singleOrder = await prisma.order.findFirst({
      where: {
        userId: Number(uniqueUser.id),
        isFulfilled: true,
      },
      include: {
        order_products: true,
      },
    });
    res.send(singleOrder);
  } catch (err) {
    next(err);
  }
});

router.put("/submit", authorization, async (req, res, next) => {

  try {
    async function findOpenOrder() {
      const openOrder = await prisma.order.findFirst({
        where: {
          userId: req.user.id,
          isFulfilled: false,
        },
      });
	  console.log(openOrder)
      return openOrder.id;
    }
    async function closeOrder() {
      const ClosedOrder = await prisma.order.update({
        where: {
          id: await findOpenOrder(),
        },
        data: {
          isFulfilled: true,
        },
      });
    }

    closeOrder();

    const NewOrder = await prisma.order.create({
      data: {
        userId: req.user.id,
        isFulfilled: false,
      },
    });
console.log(NewOrder)
    res.send({ NewOrder});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
