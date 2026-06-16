const express=require('express')
let router=express.Router();
const {createproduct,getproduct,createbulk,updateproduct,deleteproduct}=require('../controllers/productcontroller')
router.get('/',getproduct)
router.post('/',createproduct)
router.post('/bulk',createbulk)
router.put('/:id',updateproduct)
router.delete('/:id',deleteproduct)
module.exports=router