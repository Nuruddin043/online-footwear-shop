const express=require('express')
const multer=require('multer')
const path = require('path');
const fs = require('fs')
const Product=require('../models/product')
const router=new express.Router()
const sharp =require('sharp')
const { promisify } = require('util')
const { ObjectID } = require('mongodb')
const { findById, findOneAndDelete } = require('../models/product')
const unlinkAsync = promisify(fs.unlink)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
      },
    
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname); 
        
    }
  });

const upload=multer({
    storage:storage,
    limits:{
        fieldSize:5000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('file must be jpg,jpeg,png'))
        }
        cb(undefined,true)
    }
    
})

////adding new products 
router.post('/products',upload.array('product_images',10),async(req,res,next)=>{
   
    const product=new Product(req.body)
    const files = req.files
    
    if(files){
        const paths = req.files.map(file => file.path.replace("\\","/"))
        product.product_images=paths
    }
    try{
       await product.save()
       res.status(201).send(product)
    }catch(e){
        next(e)
    }
})
///geting all products info
router.get('/products',async (req,res,e)=>{
    try{
        const product=await Product.find()
        if(!product){
            return res.status(404).send()
        }
        res.send(product)
    }catch(e){
        next(e)
    }
    
})

//delete individual product item
router.delete('/products/:id',async(req,res,next)=>{
    try{
        const product=await Product.findById(req.params.id)
        if(!product){
                return res.status(404).send()
        }else{
            //delete all product images
            const deleteFiles=(files, callback)=>{
                var i = files.length;
                files.forEach((filepath)=>{
                    fs.unlink(filepath, function(err) {
                        i--;
                        if (err) {
                        callback(err);
                        return;
                        } else if (i <= 0) {
                         callback(null);
                        }
                    });
                });
            }
            if(product.product_images.length>0){
                deleteFiles(product.product_images, function(err) {
                    if (err) {
                    console.log(err);
                    } else {
                    console.log('all files removed');
                    }
                });    
            }
            await product.delete()
            res.send(product)
        }
        
    }catch(e){
        next(e)
    }
})


module.exports=router