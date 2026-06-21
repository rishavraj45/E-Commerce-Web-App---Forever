import { v2 as cloudinary } from 'cloudinary';


// function for add product
const addProduct = async (req,res) => {
    // to add product, we'll create a middleware using multer
    try {
        
        const {name,description,price,category,subCategory,sizes,bestseller} = req.body 
        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 && req.files.image2[0]
        const image3 =req.files.image3 && req.files.image3[0]
        const image4 =req.files.image4 && req.files.image4[0]

        // can't store images directly in database, to do it we'll upload it on cloudinary and using it's url , we will store url in our database
        const images = [image1,image2,image3,image4].filter((item)=> item !==undefined)

        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )

        console.log(name,description,price,category,subCategory,sizes,bestseller)
        // console.log(image1,image2,image3,image4)
        // console.log(images)
        console.log(imagesUrl)

        res.json({})

        //POSTMAN : POST http://localhost:4000/api/product/add
        //see response here in vs terminal
        
    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})

    }
}


// function for list product
const listProducts = async (req,res) => {
    
}


// function for removing product
const removeProduct = async (req,res) => {
    
}


// function for single product info
const singleProduct = async (req,res) => {
    
}


export {listProducts,addProduct,removeProduct,singleProduct}