const mongooes=require('mongoose')
const { model } = require('./reviews')
const requireString={
    type:String,
    required:true,
    trim:true
}
const userSchema=mongooes.Schema({
    first_name:{
        ...requireString
    },
    last_name:{
        ...requireString
    },
    email:{
        type:email,
       
    },
    phone_no:{
        type:Number,
        required:true,
        validate(value){
            if(!value.length==11){
                throw new Error('Number must be lenght of 11')
            }
        }
    },
    address:{
        street:{
            ...requireString
        },
        City:{
            ...requireString
        },
        State:{
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
    }

})  


userSchema.virtual('reviews',{
    ref:'Review',
    localField:'_id',
    foreignField:'user'
})


const User=mongooes.model('User',userSchema)
module.exports=User