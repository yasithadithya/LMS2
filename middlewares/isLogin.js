const Admin = require("../model/Staff/Admin");
const verifyToken = require("../utils/verifyToken");

const islogin = async (req, res, next)=>{
    //Get token from header
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];

    //Verify Token
    const verifiedToken = verifyToken(token)
    if (verifiedToken){
        //find the admin
        const user = await Admin.findById(verifiedToken.id).select(
            "name email role"
        )
        //Save the user info req.obj
        req.userAuth = user
        next();
        
    }else{
        const err = new Error('Token Expired / Invalid')
        next(err)
    }
    

    
};

module.exports = islogin;