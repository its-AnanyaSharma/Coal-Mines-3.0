import bcrypt from 'bcrypt'
import { comparePassword, hashPW } from "../helper/authHelper.js"
import userModel from "../models/userModel.js"
import JWT from 'jsonwebtoken'

export const registerContoller= async(req,res)=>{
    try {
        const {name, email,password,phone,address}= req.body
        if (!name) return res.status(400).json({ success: false, message: 'Name is required!' });
        if (!email) return res.status(400).json({ success: false, message: 'Email is required!' });
        if(!password){return res.status(400).json({success: false,message:'Password is required!'})}
        if (!phone) return res.status(400).json({ success: false, message: 'Phone is required!' });
        if (!address) return res.status(400).json({ success: false, message: 'Address is required!' });

        const existingUser= await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'Already registered, please Login!'
})      
  }
  //register user
  const hashedPassword= await hashPW(password)
  //save
  const user = await new userModel({
    name,
    email,
    phone,
    address,
    password:hashedPassword,
}).save()
  res.status(201).json({
    success:true,
    message:'User Registered Successfully',
    user
  })
    }
    catch (error){
        console.error(error)
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
}
// POST LOGIN
export const loginController= async(req,res)=>{
    try{
        const {email,password}= req.body
        //validation
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Invalid email or password'
            })
        }
        //check user existence
        const user= await userModel.findOne({email})
        if(!user){
            return res.status(404).json({
                message:"Email not registered!"
            })
        }
        console.log(`User found: ${user.email}`);
        //compare password
        const isMatch = await comparePassword(password, user.password)
        console.log(`Password comparison result: ${isMatch}`);
        if(!isMatch){
            console.log('Passwords do not match');
            return res.status(401).json({
                message:'Invalid password'
            })
        }
        //generate token
        const token =  JWT.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn:'7d'})
        res.status(200).json({
            success:'true',
            message:'Login Successfully ;)',
            users:{
                name:user.name,
                email:user.email,
                // password:user.password,
                phone:user.phone,
                address:user.address
            },
            token
        })
    }
    catch(error){
        console.error(error)
        console.error('Error during login process:', error);
        res.status(500).json({
            success:false,
            message:"Error in login :/",
            error
        })
    }

}

//test controller
export const testController = (req,res)=>{
    res.send('protected route')
}