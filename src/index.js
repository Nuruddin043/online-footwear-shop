const express=require('express')
require('dotenv').config()
require('./db/mongoose')
const productRouter=require('./routers/product')
const categoryRouter=require('./routers/category')
const morgan=require('morgan')
const app=express()


const port=process.env.PORT
const Router=new express.Router()


app.use(morgan('common'))
app.use('/prod_image',express.static('uploads'))
app.use(express.json())
app.use(productRouter)
app.use(categoryRouter)



app.use((req,res,next)=>{
    const error=new Error(`Not found -${req.originalUrl}`)
    res.status(404)
    next(error)
})
app.use((error,req,res,next)=>{
    res.send({
        error:error.message
    })
})



app.listen(port,()=>{
    console.log('server is runing at port',port)
})
