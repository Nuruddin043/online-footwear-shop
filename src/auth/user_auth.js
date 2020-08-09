const jwt=require('jsonwebtoken')
const User=require('../models/user')

const userAuth= async (req,res,next)=>{
    try{
        const  token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findOne({_id:decoded._id,'tokens.token':token})
        if(!user){
            throw new Error()
        }
        req.user=user
        req.token=token
        next()

    }catch{
        res.status(401).send({error:'please authenticate'})
    }
}


module.exports=auth