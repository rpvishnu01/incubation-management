const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userMOdel')

const authMidleware = expressAsyncHandler(async (req, res, next) => {
    let token;
    console.log("========================Auth midlleware=");
    
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("skdfjlskdf")
            console.log(token)

            if (token) {
             
                const decoded = jwt.verify(token, 'nan123')
                console.log("declkdf",decoded);
                const user = await User.findById(decoded?.id).select("-password")
                req.user = user
                console.log("user",req.user);
                next()
            } else {
           
                throw new Error("No token attached")
            }
        } catch (error) {
            throw new Error("not authorized token expired,login again")
        }
    }else{
        throw new Error("no token attached in header")
    }
})


module.exports = authMidleware;