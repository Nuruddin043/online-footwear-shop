const express= require('express')
const Category=require('../models/category')

const router=new express.Router()

//adding new category 
router.post('/category',async(req,res,next)=>{
    const category=new Category(req.body)
    try{
        await category.save()
        res.status(201).send(category)
    }catch(e){
        next(e)
    }
})
//getting all category info
router.get('/category',async(req,res,next)=>{
    try{
        const categories=await Category.find()
        res.send(categories)
    }catch(e){
        next(e)
    }
})
//update a category info
router.patch('/category/:id',async(req,res,next)=>{
    try{
      const category=await Category.findById(req.params.id)
      const updates=Object.keys(req.body)
      updates.forEach((update)=>category[update]=req.body[update])
      await category.save()
      res.send(category)
    }catch(e){
        next(e)
    }
})


//deleting  a category 

router.delete('/category/:id',async(req,res,next)=>{
    try{    
        const cat_id=req.params.id
        const cat=await Category.findByIdAndDelete(cat_id)
        res.send(cat)
    }catch(e){
        next(e)
    }
})
module.exports=router