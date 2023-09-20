import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        require:true,
    },
    description:{
        type:String,
        default:''
    },
    stores:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'stores',
        nullable:true
    }],
    longitude:{
        type:Number,
        default:null
    },
    latitude:{
        type:Number,
        default:null
    }
})

const Profile = mongoose.models.profiles || mongoose.model('profiles',profileSchema);

export default Profile;