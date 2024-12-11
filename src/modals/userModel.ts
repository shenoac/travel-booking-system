import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    refreshToken?: string;
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('find',(next)=> {
    console.log('find data from database');
    next();
});

const User  = mongoose.model<IUser>('User', userSchema)
export default User;
export {userSchema};