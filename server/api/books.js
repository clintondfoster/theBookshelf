const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  try {
    const allBooks = await prisma.books.findMany();
    res.send(allBooks);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
    try {
      const bookId = await prisma.books.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      res.send(bookId);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id",  async (req, res, next) => {
  
    try {
      const book = await prisma.books.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.send(book);
    } catch (err) {
      next(err);
    }
  });
  
  router.post("/", async (req, res, next) => {

    try {
      const book = await prisma.books.create({
        data: req.body,
      });
      res.send(book);
    } catch (err) {
      next(err);
    }
  });
  
  router.put("/:id",  async (req, res, next) => {
  
    try {
      const book = await prisma.books.update({
        where: {
          id: Number(req.params.id),
        },
        data: req.body,
      });
      res.send(book);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
