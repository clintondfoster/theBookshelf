const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authorization = require("../middleware");

//Register new User
router.post("/register", async (req, res, next) => {
    const salt_rounds = 5;

    try {
      const { username, password } = req.body;

      if(!username || !password) {
        return res.status(400).send("Username and password are required");
      }

      // check if the username already exists
      const existingUser = await prisma.users.findUnique({
        where: {username},
      });

      if (existingUser) {
        return res.status(400).send("Username already exists");
      }

      const hashedPassword = await bcrypt.hash(password, salt_rounds);

      const user = await prisma.users.create({
        data: {
          username,
          password: hashedPassword }
      });

    // check if the username already exists
    const existingUser = await prisma.users.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).send("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, salt_rounds);

    const user = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const NewOrder = await prisma.order.create({
      data: {
        userId: user.id,
        isFulfilled: false,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT);

    res.status(201).send({
      message: "You have registered a new account!",
      token,
      user: {
        userId: user.id,
        username: user.username,
      },
    });
  } catch (err) {
    next(err);
  }
});

//Login User
router.post("/login", async (req, res, next) => {
  try {
    // console.log("login request recieved", req.body)
    const { username, password } = req.body;

    const user = await prisma.users.findUnique({
      where: { username },
    });

    console.log("User found", user);
    if (!user) {
      return res.status(401).send("Invalid Login");
    }

    const isValid = await bcrypt.compare(password, user.password);
    // console.log("password verification", isValid)

    if (!isValid) {
      return res.status(401).send("Invalid Login");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT);
    res.send({
      token,
      user: {
        userId: user.id,
        username: user.username,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/me", authorization, async (req, res, next) => {
  console.log("endpoint /me activated");
  if (!req.user) {
    return res.send({});
  }
  try {
    const user = await prisma.users.findUnique({
      where: { id: req.user.id },
    });
    res.setHeader("Content-Type", "application/json");

    // res.json({ message: "Test reponse from /me"})
    res.send(user);
    console.log("router /me", req.user);
  } catch (err) {
    console.log("error in /me route:", err);
    next(err);
  }
});

module.exports = router;
