//allow user to create an account and login on website
import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}

// route for user login
const loginUser = async (req,res) => {
    try {
        
        const {email,password} = req.body;
        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({success:false, message:"User does not exists"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch) {
            const token = createToken(user._id)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:'Invalid Credentials'})
        }

        /*
        Postman: POST  http://localhost:4000/api/user/login   
        */

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


// route for user register
const registerUser = async (req,res) => {
    // res.json({msg:"Register API Working"}) 
    //can see this response in postman using POST at http://localhost:4000/api/user/register
    try {
        
        const {name, email, password} = req.body;

        //checking user already exists or not
        const exists = await userModel.findOne({email})
        if(exists) {
            return res.json({success:false,message:"User already exists"})
        }

        // validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid email"})
        }
        if(password.length < 8){
            return res.json({success:false,message:"Enter a strong password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        //creating user after all steps
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })
        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true, token})

        /* To check- hit this api in postman by POST method
        http://localhost:4000/api/user/register , then before send, give input in Body => JSON format :-
        {
        "name":"rishav",
        "email":"user.forever@gmail.com",
        "password":"12345678"
        }

        now in response we will see success:true and a token generated

        with the same input, clicking send again will give response user already exists

        Can see this in mongoDB atlas => cluster0 => browse collections => ecommerce => users
        */

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


// route for admin login
const adminLogin = async (req,res) => {

}


export { loginUser, registerUser, adminLogin }

// using these controller we will create multiple routes