import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const sellerSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastName:{
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
        email:{
            type: String,
            required: true,
            unique: true,
            matchMail: [/.+@.+\..+/, 'Please enter a valid email address'],
        },
        password:{
            type: String,
            required: true,
            minlength: [6, 'Password must be at least 6 characters long'],
        },socketId:{
            type: String,
        },
        status:{
            type: String,
            enum: ['active', 'inactive'],
            default: 'inactive',
        },
    })

sellerSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;  
}
sellerSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

sellerSchema.statics.hashPassword= async function (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

const sellerModel = mongoose.model('Seller', sellerSchema);

export default sellerModel;