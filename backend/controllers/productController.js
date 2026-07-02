import { cloudinary } from "../config/cloudinary.js";
import productModel from "../models/productModel.js"

// function for add product
const addProduct = async (req,res) => {
    try {
        const {name,description,price,category,subCategory, sizes, bestseller} = req.body;

        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 && req.files.image2[0]
        const image3 =req.files.image3 && req.files.image3[0]
        const image4 =req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                // console.log(result);
                return result.secure_url;
            })
        )

        // console.log(name,description,price,category,subCategory, sizes, bestseller)
        // console.log(image1,image2,image3,image4)
        // console.log(images)
        // console.log(imagesUrl)

        // to store these data in mongoDB
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller : bestseller === "true" ? true: false,
            sizes: JSON.parse(sizes),
            //converting size from string to array
            image: imagesUrl,
            date: Date.now()
        }
        console.log(productData);

        const product = new productModel(productData);
        await product.save()
        // now product will be saved in mongoDB database=> can check in products on mongoDB cluster
        // now we'll make authentication on this route so only admin could add product using the admin mail and password

        res.json({
            success: true,
            message: "Product Added",
            imagesUrl,
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
}

// function for list product
const listProducts = async (req,res) =>{
    try {
        const products = await productModel.find({});
        res.json({
            success:true,
            products
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

// function for removing product
const removeProduct = async (req,res) =>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({
            success:true,
            message:"Product Removed"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

// function for single product info
const singleProduct = async (req,res) =>{
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({
            success: true,
            product
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}


export {listProducts,addProduct,removeProduct,singleProduct}