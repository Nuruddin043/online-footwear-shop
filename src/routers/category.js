const express= require('express')
const Category=require('../models/category')

const router=new express.Router()


router.post('/category',async(req,res,next)=>{
    const category=new Category(req.body)
    try{
        await category.save()
        res.status(201).send(category)
    }catch(e){
        next(e)
    }
})

module.exports=router