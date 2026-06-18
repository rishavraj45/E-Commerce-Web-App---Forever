import mongoose from "mongoose";

// creating schema : schema is a structure using that we can create the data in database
const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:Array, required:true},
    category: {type:String, required:true},
    subCategory: {type:String, required:true},
    sizes: {type:Array, required:true},
    bestseller: {type:Boolean},
    date: {type:Number, required:true}
})

// using above schema, we'll create model
// const productModel = mongoose.model("product",productSchema)
// whenever we run this, the model will be created multiple times. This will give error, to solve this below code:
const productModel = mongoose.models.product || mongoose.model("product",productSchema);
// so, now when product model is already avaliable then that model will be used, if it is not available then it will create a new model using this productSchema

export default productModel

