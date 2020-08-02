const mongooes=require('mongoose')


const categorySchema= new mongooes.Schema({
    slug:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }
})

categorySchema.virtual('Product',{
    ref:'Product',
    localField:'_id',
    foreignField:'primary_category'
})

const Category=mongooes.model('Category',categorySchema)
module.exports= Category