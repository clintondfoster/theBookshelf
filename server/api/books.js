const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authorization = require("../middleware") ;

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

  router.delete("/:id", authorization,  async (req, res, next) => {
  
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
  
  router.post("/", authorization, async (req, res, next) => {

    console.log("adding book, req.body");
    try {
      const book = await prisma.books.create({
        data: req.body,
      });
      console.log("book added with detail", book)
      res.send(book);
    } catch (err) {
      console.error("Error adding book", err)
      res.status(500).send(err.message);
      next(err);
    }
  });
  
  router.put("/:id", authorization, async (req, res, next) => {
    console.log('ID from Params:', req.params.id); 
    console.log('Request Body:', req.body); 

    if (!Number(req.params.id)) {
        return res.status(400).send('Invalid ID parameter'); 
    }

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send('Request body cannot be empty'); 
    }

    try {
        const existingBook = await prisma.books.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });

        if (!existingBook) {
            return res.status(404).send('Book not found'); 
        }

        const book = await prisma.books.update({
            where: {
                id: Number(req.params.id),
            },
            data: req.body,
        });
        res.send(book);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message); 
    }
});

module.exports = router;
