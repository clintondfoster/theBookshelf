const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authorization = require("../middleware");

//Apply the middleware to every route in this router
router.use(authorization);

//User can get/view their own profile
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

// if (!user.admin) {
//   return res.send(403).send("Access denied. Insufficient permissions.");
// }


//Admin can get/view a user by profile:id
router.get("/profile/:id", async (req, res, next) => {
  try {
      if (!req.user) {
          return res.status(401).send("User not authenticated");
      }

      //Only admin or the user themselves can view the profile
      if (!req.user.admin && req.user.id !== Number(req.params.id)) {
          return res.status(403).send("Access denied. Admin only.");
      }

      const user = await prisma.users.findUnique({
          where: { id: Number(req.params.id) },
      });

      if (!user) {
          return res.status(404).send("User not found");
      }

      res.send(user);
  } catch (err) {
      next(err);
  }
});


// router.put("/profile", async (req, res, next) => {
//   try {
//     if (!req.user) {
//         return res.status(401).send("User not authenticated");
//     }

//     const updatedInfo = req.body;

//     const updatedUser = await prisma.users.update({
//         where: { id: req.user.id },
//         data: updatedInfo,
//     });

//     res.send(updatedUser);
// } catch (err) {
//     next(err);
// }
// });

//Create user - Admin Only
router.post('/', async (req, res, next) => {
  try{
    if (!req.user || !req.user.admin) {
      return res.status.apply(403).send("Access denied. Admin only.");
    }
    const user = await prisma.users.create({
      data:req.body
    })
    res.send(user)
  } catch(error) {
  }
})

  //Admin only delete user
  router.delete("/:id", async (req, res, next) => {
  
    try {
      if (!req.user.admin) {
        return res.status(403).send("Access denied. Admin only.");
      }

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
  
  //Admin can - Update user profile & make a user 'admin'
  router.put("/profile/:id", async (req, res, next) => {
  
    const userIdFromToken = req.user.id;
    const userIdFromParam = Number(req.params.id);

    if(!req.user.admin && req.body.hasOwnProperty('admin')) {
      return res.status(403).send("You are not authorizated to change admin status.")
    }

    if (!req.user.admin && userIdFromToken !== userIdFromParam) {
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

//   //Admin only - Update User to be admin
//   router.put('/users/:id/admin', async (req, res, next) => {
//     if (!req.user.admin) {
//         return res.status(403).send('Access denied. Admin rights required.');
//     }

//     try {
//         const updatedUser = await prisma.users.update({
//             where: { id: Number(req.params.id) },
//             data: { admin: true },
//         });

//         res.send(updatedUser);
//     } catch (err) {
//         next(err);
//     }
// });

module.exports = router;