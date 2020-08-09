const express=require('express')
const router=new express.Router()
const User=require('../models/user')
const bcrypt=require('bcrypt')

router.post('/users',async(req,res,next)=>{
    const user=new User(req.body)
    try{
        await user.save()
        const token= await user.generateAuthToken()
        res.status(201).send({user,token})
    
    }catch(e){
        next(e)
    }

})


module.exports=router