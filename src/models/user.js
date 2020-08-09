const mongooes=require('mongoose')
const { model } = require('./reviews')
const bcrypt=require('bcrypt')
const validator=require('validator')
const jwt=require('jsonwebtoken')

const requireString={
    type:String,
    trim:true,
    required:true
}
const userSchema=mongooes.Schema({
    first_name:{
        ...requireString
    },
    last_name:{
        ...requireString
    },
    email:{
        ...requireString,
        lowercase:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }
    },
    phone_no:{
        type:Number,
        required:true,
        validate(value){
            if(!value.length==10){
                throw new Error('Number must be lenght of 11')
            }
        }
    },
    address:{
        street:{
            ...requireString
        },
        city:{
            ...requireString
        },
        state:{
            ...requireString
        },Zip:{
            type:Number
        }
    },
    password:{
        ...requireString,
        validate(value){
            if(value.length<6){
                throw new Error('Password must be bigger then lenght 6')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

})  
userSchema.methods.toJSON= function(){
    const user=this
    const userObject= user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}
userSchema.methods.generateAuthToken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},process.env.ACCESS_TOKEN_SECRET)
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})



// userSchema.virtual('reviews',{
//     ref:'Review',
//     localField:'_id',
//     foreignField:'user'
// })


const User=mongooes.model('User',userSchema)
module.exports=User