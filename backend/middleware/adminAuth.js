import jwt from 'jsonwebtoken'


const adminAuth = async (req,res,next) => {
    try {
        const {token} = req.headers
        if(!token) {
            return res.json({
                success: false,
                message: "Not authorized"
            })
        }
        // if correct token, then decode it
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({
                success: false,
                message: "Not authorized"
            })
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}


export default adminAuth


// http://localhost:4000/api/product/add 
// now hitting this api without admin login, will show an error message and can't add product without admin login. 
// now do admin login by hitting http://localhost:4000/api/user/admin , then u will get a token. Just copy paste that token in add product api under header section. 
// now admin login is done and product added successfully. 
