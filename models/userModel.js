import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const UserSchema = new mongoose.Schema({
  name: {type: String,required: true,trim:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: {type: String,required: true,},
  address: {type: String,required: true,},
  role:{type:Number,default:0}
},{timestamps:true})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
export default mongoose.model('users',UserSchema)
// export default userModel