import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
    profileId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'profiles',
        required:true
    },
    storename:{
        type:String,
        default:'store name',
    },
    description:{
        type:String,
        default:''
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        nullable:true
    }]
})

const Store = mongoose.models.stores || mongoose.model('stores',storeSchema);

export default Store;