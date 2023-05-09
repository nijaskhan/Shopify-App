const jwt = require('jsonwebtoken');
const Admin = require("../models/adminModel");

module.exports ={
    login: async(req, res)=>{
        try{
            const admin = await Admin.findOne({email: req.body.email}).exec();
            if(admin){
                if(admin.password===req.body.password){
                    const token = jwt.sign({adminId: admin._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
                    res.send({
                        success: true,
                        message: "admin logged in succesfully",
                        data: token,
                        admin: admin
                    });
                }else{
                    throw new Error("Invalid password !!");
                }
            }else{
                throw new Error("Invalid Credentials !!");
            }
        }catch(err){
            res.send({
                success: false,
                message: err.message
            });
        }
    }
}