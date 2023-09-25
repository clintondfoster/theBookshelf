const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await prisma.users.findMany();
    res.send(allUsers);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      res.send(user);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id",  async (req, res, next) => {
  
    try {
      const user = await prisma.users.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.send(user);
    } catch (err) {
      next(err);
    }
  });
  
  router.post("/", async (req, res, next) => {

    try {
      const book = await prisma.users.create({
        data: req.body,
      });
      res.send(book);
    } catch (err) {
      next(err);
    }
  });
  
  router.put("/:id",  async (req, res, next) => {
  
    try {
      const user = await prisma.users.update({
        where: {
          id: Number(req.params.id),
        },
        data: req.body,
      });
      res.send(user);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
