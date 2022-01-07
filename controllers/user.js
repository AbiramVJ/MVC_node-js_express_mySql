import express from "express";

const Router = express.Router();

//dataModel
import User from "../models/user.js";
import Product from "../models/product.js"

/**
 * route:http://localhost:3000/user/post
 * method: POST
 * parameter: none
 * description: creating a new user
 * assess: public
 */

Router.post("/post",async(req,res)=>{
    
    try{
        const newUser = await User.create(req.body);
        res.status(200).json({user:newUser});

    }catch(error){
        res.status(500).json({error:error.message});
    }
    
})



export default Router;