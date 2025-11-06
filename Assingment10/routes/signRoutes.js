const express=require('express');
const handler=require('../controllers/userController')

const router=express.Router();

router.post("/signup",handler.collect);

router.post("/signin",handler.validate);


module.exports=router;
