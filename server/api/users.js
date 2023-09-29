const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


// function authenticateToken (req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) return res.sendStatus(401); //if there is no token, then unauthorized 

//   jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) return res.sendStatus(403); //if token is not valid, then forbidden
//     req.user = user;
//     next();
//   })
// }


router.get("/profile", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send("User not authenticated")
    }

    const user = await prisma.users.findUnique({
      where: { 
        id: Number(req.params.id),
      }
    });

    if (!user) {
      return res.send(404).send("User not found");
    }

    res.send(user)
  } catch (err) {
    next(error);
  }
});


router.put("/profile", async (req, res, next) => {
  try {
    if (!req.user) {
        return res.status(401).send("User not authenticated");
    }

    const updatedInfo = req.body;

    const updatedUser = await prisma.users.update({
        where: { id: req.user.id },
        data: updatedInfo,
    });

    res.send(updatedUser);
} catch (err) {
    next(err);
}
});

// router.get("/", async (req, res, next) => {
//   try {
//     const allUsers = await prisma.users.findMany();
//     res.send(allUsers);
//   } catch (err) {
//     next(err);
//   }
// });

// router.get("/:id", async (req, res, next) => {
//     try {
//       const user = await prisma.users.findUnique({
//         where: {
//           id: Number(req.params.id),
//         },
//       });
//       res.send(user);
//     } catch (err) {
//       next(err);
//     }
//   });


router.post('/', async (req, res, next) => {
  try{
    const user = await prisma.order.create({
      data:req.body
    })
    res.send(user)
  } catch(error) {
  }
})

  router.delete("/:id", async (req, res, next) => {
  
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
  


  router.put("/profile/:id", async (req, res, next) => {
  
    const userIdFromToken = req.user.id;
    const userIdFromParam = Number(req.params.id);

    if (userIdFromToken !== userIdFromParam) {
      return res.status(403).send("You can only update your own information.")
    }

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