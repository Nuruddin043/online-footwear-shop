const monogooes=require('mongoose')


const orderShcema={
    user:{
        type:mongooes.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    
    list_of_items:[{
        product:{
            type:mongooes.Schema.Types.ObjectId,
            ref:'Product',
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        size:{
            type:String,
            required:true,
            trim:true
        },
        color:{
            type:String,
            required:true
        }
    }]
}