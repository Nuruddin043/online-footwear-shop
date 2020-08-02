const mongooes=require('mongoose')
const reviewSchema= new mongooes.Schema({
    user:{
        type:mongooes.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    product:{
        type:mongooes.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    review_title:{
        type:String,
      
    },
    description:{
        type:String
    }
})


const Review=mongooes.model('Review',reviewSchema )

module.export=Reviews