const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

router.post('/signup', async(req, res)=>{
    console.log(req.body);
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            success: true,
            message: "User created Succesfully"
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

module.exports = router;