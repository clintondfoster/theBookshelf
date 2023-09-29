const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// go in cart -> pass in user id to find the cart obj -> update boolean to true


router.get("/", async (req,res,next)=>{
console.log(req.user)
return 
  try {
		const findUser = await prismaClient.users.find({
			where: {
				id: Number(req.params.id),
			},
		});

        const findCart = await prismaClient.cart.find({
            where:{	is_cart:false
           
            },
            inclue:{

              
		
                
            }, 
		});
    // update is_cart to true
		res.send(findCart);
	}catch (err){
		next(err);
	}
});


router.post('/', async (req,res,next)=>{
  try{
      const Cart = await prisma.cart.create({
    //  create cart with user id , order id
      })
      res.send(cart)
  }catch(error){
      next(error)
  }
})



router.delete('/:id', async (req,res,next)=>{
  try{
      const cart = await prisma.cart.delete({
          where:{
              id: Number(req.params.id)
          }
      });
      res.send(cart)
  }catch(error){
      next(error)
  }
})


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
    const orders = await prisma.users.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        is_Cart: true,
      },
    });
  } catch (err) {
    next(err);
  }
});


module.exports = router;
