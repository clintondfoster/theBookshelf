const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// get all
router.get("/", async (req,res,next)=>{
	try{
		// 
	res.send("test")

	// res.send(allOrders)
	}catch(err){
		next(err);
	}
})


// add an order
router.post("/", async (req,res,next)=>{
	try{
		const createOrder = await prisma.order.create({
			data: req.body
		})

		res.send(createOrder)
	}catch(err){
		next(err);
	}
})





	  
module.exports = router;