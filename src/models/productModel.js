import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
        storeId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'stores',
            required:true,
        },
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            default:''
        },
        price:{
            type:Number,
            required:true
        },
        imageurl:{
            type:String,
            required:true
        },
        category:{
            type:String,
            default:''
        },
})

const Product = mongoose.models.products || mongoose.model('products',productSchema);

export default Product;