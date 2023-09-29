const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();




router.post("/order", async (req, res, next) => {


	try{
		const getOrder = await prismaClient.cart.find({
		  where:{
			userId
		  }	
	  
		});
	  
		const createOrder = await prismaClient.order.create({
		  data:{
			bookId,
			orderId,
			price,
		  }
		})
	  res.send(createOrder);
	  
	  }catch(err){
		next(err);
	  }  
	  
	  });
	  
module.exports = router;