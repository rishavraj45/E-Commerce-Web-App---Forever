import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    cartData: {type:Object, default:{}}
},{minimize:false})
// in cartData, by default we provided the value as empty object. So whenever we'll be creating user with mongoose then this cartData will be unavailable beacuse mongoose neglect the property where we have an empty object.
// So we added minimize property as false if we want to create cartData also when we create user.

// model using above schema
const userModel = mongoose.models.user || mongoose.model('user',userSchema);


export default userModel