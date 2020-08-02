const mongooes=require('mongoose')
const requiredString={
    type:String,
    required:true,
    trim:true,
}
const numberWithDefault={
    type:Number,
    required:true,
    default:0
}
const productSchema= new mongooes.Schema({
    slug:{
        ...requiredString,
        unique:true
    },
    sku:{
        ...requiredString,
        unique:true
    },
    name:{
        ...requiredString
    },
    description:{
        ...requiredString
    },
    details:{
        manufactuer:{
            ...requiredString
        },
        size:{
            ...requiredString
        },
        model_num:{
            ...requiredString
        },
        color:{
            ...requiredString
        }

    },
    total_stock:{
        ...numberWithDefault
    },
    total_reviews:{
        ...numberWithDefault
    },
    avg_review:{
        ...numberWithDefault
    },
    price:{
        retail_price:{
            ...numberWithDefault
        },
        sale_price:{
            ...numberWithDefault
        }
    },
    primary_category:{
        type: mongooes.Schema.Types.ObjectId,
        required:true,
        ref:'Category'
    },
    tags:[String],
    
    product_images:[String]

})


productSchema.virtual('reviews',{
    ref:'Review',
    localField:'_id',
    foreignField:'user'
})

const Product=mongooes.model('Product',productSchema)


module.exports=Product